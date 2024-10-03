import tensorflow as tf
import os
from PIL import Image
import numpy as np

BASE_DIR = os.path.dirname(__file__)

# Ruta al modelo entrenado
MODEL_PATH = os.path.join(BASE_DIR, '..', 'Entrenamiento', 'model_training', 'modelo_perrito_entrenado.h5')


def cargar_o_crear_modelo(X_train = "", y_train = ""):
    if os.path.exists(MODEL_PATH):
        print("Cargando el modelo preentrenado...")
        model = tf.keras.models.load_model(MODEL_PATH)
    else:
        print("Creando un nuevo modelo...")
        model = tf.keras.Sequential([
            tf. keras.layers.InputLayer(shape=(224, 224, 3)),
            tf.keras.layers.Conv2D(32, (3, 3), activation='relu'),
            tf.keras.layers.MaxPooling2D(pool_size=(2, 2)),
            tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
            tf.keras.layers.MaxPooling2D(pool_size=(2, 2)),
            tf.keras.layers.Conv2D(128, (3, 3), activation='relu'),
            tf.keras.layers.MaxPooling2D(pool_size=(2, 2)),
            tf.keras.layers.Flatten(),
            tf.keras.layers.Dense(128, activation='relu'),
            tf.keras.layers.Dense(1, activation='sigmoid') 

        ])
        # Optimización con SGD
        model.compile(optimizer=tf.keras.optimizers.SGD(learning_rate=0.001),
                      loss='binary_crossentropy',
                      metrics=['accuracy'])
        model.fit(X_train, y_train, epochs=5)  # Aquí debes proporcionar X_train e y_train

        # Guardar el modelo entrenado
        model.save(MODEL_PATH)
        print(f"Modelo guardado en {MODEL_PATH}")

    return model


def preprocess_image(image_path, add_batch_dim=False):
    try:
        img = Image.open(image_path).convert('RGB')
    except Exception as e:
        raise ValueError(f"No se pudo abrir la imagen: {e}")

    img = img.resize((224, 224))  # Redimensionar la imagen
    img_array = np.array(img) / 255.0  # Normalizar

    if add_batch_dim:
        return np.expand_dims(img_array, axis=0)  # Añadir una dimensión extra para el batch
    return img_array  # Devolver sin la dimensión del batch