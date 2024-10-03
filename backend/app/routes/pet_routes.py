from fastapi import APIRouter, UploadFile, File
from app.ml.classifier import classify_pet_api
import shutil
import os

router = APIRouter()

@router.post("/classify_pet")
async def classify_pet(file: UploadFile = File(...)):
    # Guardar temporalmente la imagen subida con una extensión válida
    temp_image_path = f"temp_{file.filename}"
    with open(temp_image_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Verificar que el archivo se haya creado
    if not os.path.exists(temp_image_path):
        return {"error": "El archivo temporal no se ha creado."}

    # Asegúrate de que la imagen se guardó correctamente
    if not os.path.exists(temp_image_path):
        return {"error": "No se pudo guardar la imagen temporal"}

    try:
        # Clasificar la imagen
        result = classify_pet_api(temp_image_path)
        return result
    finally:
        # Eliminar la imagen temporal
        os.remove(temp_image_path)
