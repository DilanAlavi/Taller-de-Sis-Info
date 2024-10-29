import tensorflow as tf
import numpy as np
from PIL import Image
import os


BASE_DIR = os.path.dirname(__file__)
print(BASE_DIR)

# MODEL_PATH = os.path.join(BASE_DIR, '..', 'Entrenamiento', 'model_training', 'modelo_perro_entrenado.h5')

MODEL_PATH = "C:\\Users\\Sebas\\Documents\\TALLER SIS INFO\\finalModel2.h5"


def preprocess_image(image_path, add_batch_dim=False):
    try:
        img = Image.open(image_path).convert('RGB')
    except Exception as e:
        raise ValueError(f"No se pudo abrir la imagen: {e}")

    img = img.resize((224, 224))  
    img_array = np.array(img)  

    if add_batch_dim:
        img_array = img_array / 255.0
        return np.expand_dims(img_array, axis=0)  
    return img_array 


def cargar_o_crear_modelo():
    if os.path.exists(MODEL_PATH):
        print("Cargando el modelo preentrenado...")
        model = tf.keras.models.load_model(MODEL_PATH)
    else:
        print("Error")
    return model

# def update_model_with_new_image(new_image_path, label):
#     model = cargar_o_crear_modelo()
#     # Preprocesar la nueva imagen
#     new_image = preprocess_image(new_image_path)
    
#     # Ajuste pequeño del modelo
#     model.fit(new_image, np.array([label]), epochs=1, verbose=0)

#     # Guardar el modelo actualizado
#     model.save(MODEL_PATH)
#     print(f"Modelo actualizado y guardado en {MODEL_PATH}")



def classify_pet(image_path):
    model = cargar_o_crear_modelo()
    processed_image = preprocess_image(image_path, add_batch_dim=True)
    prediction = model.predict(processed_image)
    print(prediction[0][0])
    if prediction[0][0] > 0.5:
        return "Perro"
    else:
        return "No perro"


def classify_pet_api(image_path):
    try:
        result = classify_pet(image_path)
        return {"clasificacion": result, "confianza": "Alta"}
    except Exception as e:
        return {"error": str(e)}
