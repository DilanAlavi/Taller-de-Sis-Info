# app/ml/dog_classifier.py
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input, decode_predictions
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
import tensorflow as tf
import os
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
from PIL import Image
import io

class DogClassifier:
    def __init__(self):
        try:
            # Cargar el modelo pre-entrenado sin mostrar summary
            print("Inicializando modelo MobileNetV2...")
            self.model = MobileNetV2(weights="imagenet")
            
            # Configurar Google Drive
            creds_path = os.path.join('app', 'credenciales', 'fotos-perritos-809194cdb9d7.json')
            if os.path.exists(creds_path):
                credentials = service_account.Credentials.from_service_account_file(
                    creds_path,
                    scopes=['https://www.googleapis.com/auth/drive.readonly']
                )
                self.drive_service = build('drive', 'v3', credentials=credentials)
            else:
                print("Archivo de credenciales no encontrado")
                self.drive_service = None
            
        except Exception as e:
            print(f"Error inicializando clasificador: {str(e)}")
            raise

    def es_golden(self, image_path):
        """
        Verifica si una imagen es de un Golden Retriever.
        Retorna: (bool, float) - (es_golden, confianza)
        """
        try:
            # Cargar y preprocesar la imagen
            imagen = load_img(image_path, target_size=(224, 224))
            imagen_array = img_to_array(imagen)
            imagen_array = preprocess_input(imagen_array)
            imagen_array = tf.expand_dims(imagen_array, axis=0)
            
            # Realizar la predicción
            predicciones = self.model.predict(imagen_array, verbose=0)  # Desactivar verbose
            etiqueta = decode_predictions(predicciones, top=1)[0][0]
            
            # Verificar si es golden retriever con un umbral más bajo (40%)
            es_golden = etiqueta[1] == "golden_retriever"
            confianza = float(etiqueta[2])
            
            print(f"\nRESULTADO para {os.path.basename(image_path)}:")
            print(f"Clasificación: {'Golden Retriever' if es_golden else 'No es Golden'}")
            print(f"Confianza: {confianza:.2%}\n")
            
            return es_golden, confianza
            
        except Exception as e:
            print(f"Error procesando imagen: {str(e)}")
            return False, 0.0

    def get_drive_image(self, file_id):
        """Obtiene una imagen de Drive y la guarda temporalmente."""
        if not self.drive_service:
            return None
            
        try:
            request = self.drive_service.files().get_media(fileId=file_id)
            file = io.BytesIO()
            downloader = MediaIoBaseDownload(file, request)
            
            done = False
            while done is False:
                status, done = downloader.next_chunk()
            
            file.seek(0)
            temp_path = f"temp_drive_{file_id}.jpg"
            image = Image.open(file)
            image.save(temp_path)
            return temp_path
            
        except Exception as e:
            print(f"Error obteniendo imagen de Drive: {str(e)}")
            return None

    def classify_and_find_matches(self, input_image_path, drive_images_info, threshold=0.4):  # Bajamos el umbral a 40%
        """Clasifica la imagen y busca coincidencias si es un Golden."""
        try:
            # PASO 1: Verificar si es Golden
            es_golden, confidence = self.es_golden(input_image_path)

            # Si no es Golden o no supera el umbral, terminar aquí
            if not es_golden or confidence < threshold:
                return {
                    "mensaje": "La imagen no corresponde a un Golden Retriever",
                    "confianza": f"{confidence:.2%}",
                    "coincidencias": []
                }

            # PASO 2: Si es Golden, buscar coincidencias
            print("Buscando coincidencias...")
            matches = []
            
            if drive_images_info:
                for info in drive_images_info:
                    try:
                        drive_path = self.get_drive_image(info['drive_id'])
                        if drive_path:
                            # Verificar si la imagen en Drive también es un Golden
                            drive_es_golden, drive_confidence = self.es_golden(drive_path)
                            
                            if drive_es_golden and drive_confidence >= threshold:
                                matches.append({
                                    'id': info['id'],
                                    'similitud': drive_confidence,
                                    'ubicacion': info.get('ubicacion', ''),
                                    'fecha': info.get('fecha', ''),
                                    'contacto': info.get('contacto', ''),
                                    'drive_id': info['drive_id']
                                })
                                
                            if os.path.exists(drive_path):
                                os.remove(drive_path)
                                
                    except Exception as e:
                        print(f"Error procesando imagen {info['drive_id']}: {str(e)}")
                        continue

            return {
                "mensaje": "Es un Golden Retriever",
                "confianza": f"{confidence:.2%}",
                "coincidencias": sorted(matches, key=lambda x: x['similitud'], reverse=True)[:5]
            }
            
        except Exception as e:
            print(f"Error en classify_and_find_matches: {str(e)}")
            return {"error": str(e), "coincidencias": []}