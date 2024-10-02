import tensorflow as tf
import numpy as np
from PIL import Image
import os

BASE_DIR = os.path.dirname(__file__)

# Ruta al modelo entrenado
MODEL_PATH = os.path.join(BASE_DIR, '..', 'Entrenamiento', 'model_training', 'modelo_perrito_entrenado.h5')

def preprocess_image(image_path, add_batch_dim=False):
    img = Image.open(image_path).convert('RGB')
    img = img.resize((224, 224))  # Redimensionar la imagen
    img_array = np.array(img) / 255.0  # Normalizar

    if add_batch_dim:
        return np.expand_dims(img_array, axis=0)  # Añadir una dimensión extra para el batch
    return img_array  # Devolver sin la dimensión del batch


def cargar_o_crear_modelo():
    if os.path.exists(MODEL_PATH):
        print("Cargando el modelo preentrenado...")
        model = tf.keras.models.load_model(MODEL_PATH)
    else:
        print("Creando un nuevo modelo...")
        model = tf.keras.Sequential([
            tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
            tf.keras.layers.MaxPooling2D((2, 2)),
            tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
            tf.keras.layers.MaxPooling2D((2, 2)),
            tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
            tf.keras.layers.Flatten(),
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dense(1, activation='sigmoid')  # Clasificación binaria
        ])
        # Optimización con SGD
        model.compile(optimizer=tf.keras.optimizers.SGD(learning_rate=0.001),
                      loss='binary_crossentropy',
                      metrics=['accuracy'])
    
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
    processed_image = preprocess_image(image_path)
    prediction = model.predict(processed_image)

    if prediction[0][0] > 0.5:
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
