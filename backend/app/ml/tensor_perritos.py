import tensorflow as tf
from tensorflow import keras
import os
from PIL import Image
import numpy as np

BASE_DIR = os.path.dirname(__file__)

MODEL_PATH = os.path.join(BASE_DIR, '..', 'Entrenamiento', 'model_training', 'modelo_perro_entrenado.h5')


def cargar_o_crear_modelo(X_train="", y_train=""):
    if os.path.exists(MODEL_PATH):
        print("Cargando el modelo preentrenado...")
        model = tf.keras.models.load_model(MODEL_PATH)
    else:
        print("Creando un nuevo modelo...")
        model = keras.Sequential([
            keras.layers.InputLayer(input_shape=(224, 224, 3)),
            keras.layers.Conv2D(32, (3, 3), activation='relu'),
            keras.layers.MaxPooling2D(pool_size=(2, 2)),
            keras.layers.Conv2D(64, (3, 3), activation='relu'),
            keras.layers.MaxPooling2D(pool_size=(2, 2)),
            keras.layers.Conv2D(128, (3, 3), activation='relu'),
            keras.layers.MaxPooling2D(pool_size=(2, 2)),
            keras.layers.Flatten(),
            keras.layers.Dense(128, activation='relu'),
            keras.layers.Dense(1, activation='sigmoid') 
        ])
        
        model.compile(optimizer=keras.optimizers.SGD(learning_rate=0.00001),
                      loss='binary_crossentropy',  
                      metrics=['accuracy'])


        model.fit(X_train, y_train, epochs=20)  
        print(model.history)
        model.save(MODEL_PATH)
        print(f"Modelo guardado en {MODEL_PATH}")

    return model


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