import os
import numpy as np
from sklearn.model_selection import train_test_split
from app.ml.tensor_perritos import cargar_o_crear_modelo, preprocess_image

BASE_DIR = os.path.dirname(__file__)


PERROS_PATH = os.path.join(BASE_DIR, '..', 'Entrenamiento', 'imgs', 'img-perritos')
NO_PERROS_PATH = os.path.join(BASE_DIR, '..', 'Entrenamiento', 'imgs', 'img-no-perritos')


def load_images_from_folder(folder_path, label):
    images = []
    labels = []
    for filename in os.listdir(folder_path):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            img_path = os.path.join(folder_path, filename)
            img = preprocess_image(img_path)
            images.append(img)
            labels.append(label)
    return images, labels

def entrenar_modelo():

    perros_images, perros_labels = load_images_from_folder(PERROS_PATH, 1) 
    no_perros_images, no_perros_labels = load_images_from_folder(NO_PERROS_PATH, 0)  
    

    X = np.concatenate([perros_images, no_perros_images], axis=0)  
    y = np.concatenate([perros_labels + no_perros_labels], axis=0)


    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    print(f"Número de imágenes cargadas: {len(X)}")
    print(f"Número de etiquetas cargadas: {len(y)}")

    model = cargar_o_crear_modelo(X_train, y_train)




