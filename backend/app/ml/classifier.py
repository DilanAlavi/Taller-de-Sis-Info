import tensorflow as tf
import numpy as np
from PIL import Image
import os
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input


BASE_DIR = os.path.dirname(__file__)
print(BASE_DIR)

MODEL_PATH = os.path.join(BASE_DIR, 'TallerPerritos.keras')

#MODEL_PATH = "C:\\Users\\Sebas\\Documents\\TALLER SIS INFO\\TallerPerritos.keras"


def load_and_preprocess_image(image_path):
    img = Image.open(image_path).convert('RGB')  
    img = img.resize((224, 224))  
    img_array = np.array(img)  
    img_array = preprocess_input(img_array)  
    return np.expand_dims(img_array, axis=0) 


def cargar_o_crear_modelo():
    if os.path.exists(MODEL_PATH):
        print("Cargando el modelo preentrenado...")
        model = tf.keras.models.load_model(MODEL_PATH)
    else:
        print("Error")
    return model


def classify_pet(image_path):
    model = cargar_o_crear_modelo()
    processed_image = load_and_preprocess_image(image_path)
    prediction = model.predict(processed_image)
    confidence = prediction[0][0]  
    
    if confidence > 0.5:
        return "Perro", confidence
    else:
        return "No perro", confidence



def classify_pet_api(image_path):
    try:
        result, confidence = classify_pet(image_path)
        
        return {"clasificacion": result, "confianza": f"{confidence * 100:.2f}%"}
    except Exception as e:
        return {"error": str(e)}

