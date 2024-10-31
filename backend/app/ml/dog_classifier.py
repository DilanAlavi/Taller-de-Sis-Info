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
    # Define las razas soportadas y sus etiquetas correspondientes en ImageNet
    SUPPORTED_BREEDS = {
        'golden_retriever': {
            'name': 'Golden Retriever',
            'imagenet_labels': ['golden_retriever']
        },
        'cocker_spaniel': {
            'name': 'Cocker Spaniel',
            'imagenet_labels': ['English_cocker_spaniel', 'cocker_spaniel']
        },
        'german_shepherd': {
            'name': 'Pastor Alemán',
            'imagenet_labels': ['German_shepherd', 'German_shepherd_dog', 'German_police_dog', 'alsatian']
        },
        'pitbull': {
            'name': 'Pitbull',
            'imagenet_labels': ['American_Staffordshire_terrier', 'Staffordshire_bullterrier', 'American_pit_bull_terrier']
        }
    }

    def __init__(self):
        try:
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

    def classify_breed(self, image_path):
        """
        Clasifica la raza del perro en la imagen.
        Retorna: (str, float) - (raza_detectada, confianza)
        """
        try:
            # Cargar y preprocesar la imagen
            imagen = load_img(image_path, target_size=(224, 224))
            imagen_array = img_to_array(imagen)
            imagen_array = preprocess_input(imagen_array)
            imagen_array = tf.expand_dims(imagen_array, axis=0)
            
            # Realizar la predicción
            predicciones = self.model.predict(imagen_array, verbose=0)
            top_predicciones = decode_predictions(predicciones, top=5)[0]  # Obtener top 5 predicciones
            
            # Buscar coincidencias con las razas soportadas
            for pred in top_predicciones:
                etiqueta = pred[1]
                confianza = float(pred[2])
                
                # Verificar cada raza soportada
                for breed_key, breed_info in self.SUPPORTED_BREEDS.items():
                    if etiqueta in breed_info['imagenet_labels']:
                        print(f"\nRESULTADO para {os.path.basename(image_path)}:")
                        print(f"Clasificación: {breed_info['name']}")
                        print(f"Confianza: {confianza:.2%}")
                        return breed_key, confianza
            
            return None, 0.0
            
        except Exception as e:
            print(f"Error procesando imagen: {str(e)}")
            return None, 0.0

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

    def classify_and_find_matches(self, input_image_path, drive_images_info, threshold=0.35):  # Bajamos el umbral a 35%
        """Clasifica la imagen y busca coincidencias si es una de las razas soportadas."""
        try:
            # PASO 1: Clasificar la raza
            raza_detectada, confidence = self.classify_breed(input_image_path)

            # PASO 2: Buscar coincidencias incluso si la confianza es baja
            matches = []
            
            print(f"Buscando coincidencias...")
            
            if drive_images_info:
                for info in drive_images_info:
                    try:
                        drive_path = self.get_drive_image(info['drive_id'])
                        if drive_path:
                            # Verificar si la imagen en Drive es de la misma raza
                            drive_raza, drive_confidence = self.classify_breed(drive_path)
                            
                            # Si alguna de las imágenes es identificada como la raza buscada
                            if (raza_detectada and drive_raza == raza_detectada) or \
                               (drive_raza and info['raza'].lower() == raza_detectada):
                                matches.append({
                                    'id': info['id'],
                                    'similitud': drive_confidence,
                                    'ubicacion': info.get('ubicacion', ''),
                                    'fecha': info.get('fecha', ''),
                                    'contacto': info.get('contacto', ''),
                                    'drive_id': info['drive_id'],
                                    'raza': info['raza']
                                })
                                print(f"Coincidencia encontrada con ID {info['id']}")
                                
                            if os.path.exists(drive_path):
                                os.remove(drive_path)
                                
                    except Exception as e:
                        print(f"Error procesando imagen {info['drive_id']}: {str(e)}")
                        continue

            # PASO 3: Preparar respuesta
            if not raza_detectada:
                mensaje = "La imagen no corresponde a ninguna de las razas soportadas"
            else:
                mensaje = f"Es un {self.SUPPORTED_BREEDS[raza_detectada]['name']}"

            return {
                "mensaje": mensaje,
                "confianza": f"{confidence:.2%}",
                "coincidencias": sorted(matches, key=lambda x: x['similitud'], reverse=True)[:5]
            }
            
        except Exception as e:
            print(f"Error en classify_and_find_matches: {str(e)}")
            return {"error": str(e), "coincidencias": []}