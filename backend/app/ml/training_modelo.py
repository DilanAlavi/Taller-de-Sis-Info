import os
import numpy as np
from sklearn.model_selection import train_test_split
from app.ml.tensor_perritos import cargar_o_crear_modelo, preprocess_image

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

def entrenar_modelo():

    perros_images, perros_labels = load_images_from_folder(PERROS_PATH, 1)  # 1 para perros
    no_perros_images, no_perros_labels = load_images_from_folder(NO_PERROS_PATH, 0)  # 0 para no perros
    
    # Combinar todos los datos
    X = np.vstack(perros_images + no_perros_images)  # Usa vstack para manejar la dimensión extra
    y = np.array(perros_labels + no_perros_labels)
    print(f"Forma de y: {y}")
    print(f"Tam de y: {y}")

    # Dividir en conjuntos de entrenamiento y prueba
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Cargar o crear el modelo

    model = cargar_o_crear_modelo(X_train, y_train)

    model.save(MODEL_SAVE_PATH)
    print(f"Modelo entrenado y guardado en {MODEL_SAVE_PATH}")



