import tensorflow as tf
import numpy as np
from PIL import Image
import os

BASE_DIR = os.path.dirname(__file__)

# Ruta al modelo entrenado
MODEL_PATH =  os.path.join(BASE_DIR, '..', 'Entrenamiento', 'model_training', 'modelo_perrito_entrenado.h5')

# Cargar el modelo
model = tf.keras.models.load_model(MODEL_PATH)

def preprocess_image(image_path):
    # Abrir la imagen y convertirla a RGB
    img = Image.open(image_path).convert('RGB')
    # Redimensionar la imagen a 224x224 (o al tamaño que espera tu modelo)
    img = img.resize((224, 224))
    # Convertir la imagen a un array numpy y normalizar
    img_array = np.array(img) / 255.0
    # Añadir una dimensión extra para el batch
    return np.expand_dims(img_array, axis=0)

def classify_pet(image_path):
    # Preprocesar la imagen
    processed_image = preprocess_image(image_path)
    
    # Hacer la predicción
    prediction = model.predict(processed_image)
    
    # Interpretar la predicción
    # Asumiendo que 0 es gato y 1 es perro
    if prediction[0][0] > 0.5:
        return "Perro"
    else:
        return "Gato"

# Función para usar en la API
def classify_pet_api(image_path):
    try:
        result = classify_pet(image_path)
        return {"clasificacion": result, "confianza": "Alta"}
    except Exception as e:
        return {"error": str(e)}