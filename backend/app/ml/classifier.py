import tensorflow as tf
import numpy as np
from PIL import Image
from app.ml.training_modelo import entrenar_modelo
from app.ml.tensor_perritos import preprocess_image
import os


BASE_DIR = os.path.dirname(__file__)

# Ruta al modelo entrenado
MODEL_PATH = os.path.join(BASE_DIR, '..', 'Entrenamiento', 'model_training', 'modelo_perrito_entrenado.h5')




def cargar_o_crear_modelo():
    if os.path.exists(MODEL_PATH):
        print("Cargando el modelo preentrenado...")
        model = tf.keras.models.load_model(MODEL_PATH)
    else:
        print("Creando un nuevo modelo...")
        print(f"hola probando")
        entrenar_modelo()  
        model = tf.keras.models.load_model(MODEL_PATH)  # Cargar el modelo recién entrenado
    return model

def update_model_with_new_image(new_image_path, label):
    model = cargar_o_crear_modelo()

    # Preprocesar la nueva imagen
    new_image = preprocess_image(new_image_path)
    
    # Ajuste pequeño del modelo
    model.fit(new_image, np.array([label]), epochs=1, verbose=0)

    # Guardar el modelo actualizado
    model.save(MODEL_PATH)
    print(f"Modelo actualizado y guardado en {MODEL_PATH}")

def classify_pet(image_path):
    model = cargar_o_crear_modelo()
    processed_image = preprocess_image(image_path, add_batch_dim=True)
    prediction = model.predict(processed_image)
    print(model)
    if prediction[0][0] > 0.6:
        return "Perro"
    else:
        return "Gato"

# Para la API
def classify_pet_api(image_path):
    try:
        result = classify_pet(image_path)
        return {"clasificacion": result, "confianza": "Alta"}
    except Exception as e:
        return {"error": str(e)}
