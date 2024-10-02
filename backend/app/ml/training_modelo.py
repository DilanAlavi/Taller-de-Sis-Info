import os
import numpy as np
from PIL import Image
from sklearn.model_selection import train_test_split
from classifier import cargar_o_crear_modelo, preprocess_image  # Importar la función desde clasificación

BASE_DIR = os.path.dirname(__file__)

# Rutas de las carpetas de imágenes
PERROS_PATH = os.path.join(BASE_DIR, '..', 'Entrenamiento', 'imgs', 'img-perritos')
NO_PERROS_PATH = os.path.join(BASE_DIR, '..', 'Entrenamiento', 'imgs', 'img-no-perritos')

# Ruta para guardar el modelo entrenado
MODEL_SAVE_PATH = os.path.join(BASE_DIR, '..', 'Entrenamiento', 'model_training', 'modelo_perrito_entrenado.h5')


def load_images_from_folder(folder_path, label):
    images = []
    labels = []
    for filename in os.listdir(folder_path):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            img_path = os.path.join(folder_path, filename)
            img = preprocess_image(img_path, add_batch_dim=True)
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

# Cargar o crear el modelo
model = cargar_o_crear_modelo()

# Entrenar el modelo
history = model.fit(X_train, y_train, epochs=10, validation_data=(X_test, y_test))

# Evaluar el modelo
test_loss, test_acc = model.evaluate(X_test, y_test, verbose=2)
print(f'\nPrecisión en el conjunto de prueba: {test_acc}')

# Guardar el modelo
model.save(MODEL_SAVE_PATH)
print(f'Modelo guardado en {MODEL_SAVE_PATH}')
