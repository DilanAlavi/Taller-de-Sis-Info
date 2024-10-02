import os
import numpy as np
from PIL import Image
import tensorflow as tf
from tensorflow import keras
from sklearn.model_selection import train_test_split

BASE_DIR = os.path.dirname(__file__)

# Rutas de las carpetas de imágenes
PERROS_PATH = os.path.join(BASE_DIR, '..', 'Entrenamiento', 'imgs', 'img-perritos')
NO_PERROS_PATH =  os.path.join(BASE_DIR, '..', 'Entrenamiento', 'imgs', 'img-no-perritos')

# Ruta para guardar el modelo entrenado
MODEL_SAVE_PATH =  os.path.join(BASE_DIR, '..', 'Entrenamiento', 'model_training', 'modelo_perrito_entrenado.h5')

def load_and_preprocess_image(image_path):
    img = Image.open(image_path).convert('RGB')
    img = img.resize((224, 224))  # Redimensionar todas las imágenes a 224x224
    return np.array(img) / 255.0  # Normalizar los valores de píxeles

def load_images_from_folder(folder_path, label):
    images = []
    labels = []
    for filename in os.listdir(folder_path):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            img_path = os.path.join(folder_path, filename)
            img = load_and_preprocess_image(img_path)
            images.append(img)
            labels.append(label)
    return images, labels

# Cargar imágenes y etiquetas
perros_images, perros_labels = load_images_from_folder(PERROS_PATH, 1)  # 1 para perros
no_perros_images, no_perros_labels = load_images_from_folder(NO_PERROS_PATH, 0)  # 0 para no perros

# Combinar todos los datos
X = np.array(perros_images + no_perros_images)
y = np.array(perros_labels + no_perros_labels)

# Dividir en conjuntos de entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Definir el modelo
model = keras.Sequential([
    keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
    keras.layers.MaxPooling2D((2, 2)),
    keras.layers.Conv2D(64, (3, 3), activation='relu'),
    keras.layers.MaxPooling2D((2, 2)),
    keras.layers.Conv2D(64, (3, 3), activation='relu'),
    keras.layers.Flatten(),
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dense(1, activation='sigmoid')
])

# Compilar el modelo
model.compile(optimizer='adam',
              loss='binary_crossentropy',
              metrics=['accuracy'])

# Entrenar el modelo
history = model.fit(X_train, y_train, epochs=10, validation_data=(X_test, y_test))

# Evaluar el modelo
test_loss, test_acc = model.evaluate(X_test, y_test, verbose=2)
print(f'\nPrecisión en el conjunto de prueba: {test_acc}')

# Guardar el modelo
model.save(MODEL_SAVE_PATH)
print(f'Modelo guardado en {MODEL_SAVE_PATH}')