# import tensorflow as tf
# import numpy as np
# from PIL import Image
# import os


# BASE_DIR = os.path.dirname(__file__)
# # Ruta al modelo entrenado
# MODEL_PATH = os.path.join(BASE_DIR, '..', 'Entrenamiento', 'img-perritos')


# # Cargar el modelo
# model = tf.keras.models.load_model(MODEL_PATH)

# CLASS_NAMES = ['golden', 'pastoraleman', 'SanBernardo']

# def preprocess_image(image_path):
#     img = Image.open(image_path).convert('RGB')
#     img = img.resize((224, 224))
#     img_array = np.array(img) / 255.0
#     return np.expand_dims(img_array, axis=0)

# def classify_dog_breed(image_path):
#     processed_image = preprocess_image(image_path)
#     prediction = model.predict(processed_image)
#     predicted_class = np.argmax(prediction[0])
#     confidence = np.max(prediction[0])
#     return CLASS_NAMES[predicted_class], confidence

def classify_dog_api(image_path):
    # try:
    #     breed, confidence = classify_dog_breed(image_path)
    #     return {"raza": breed, "confianza": float(confidence)}
    # except Exception as e:
    #     return {"error": str(e)}
    return 'prueba'

# Asegúrate de que esta línea esté presente al final del archivo
if __name__ == "__main__":
    print("Módulo dog_classifier cargado correctamente")