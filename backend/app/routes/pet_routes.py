from fastapi import APIRouter, UploadFile, File
from app.ml.pet_classifier import classify_pet_api
import shutil
import os

router = APIRouter()

@router.post("/classify_pet")
async def classify_pet(file: UploadFile = File(...)):
    # Guardar temporalmente la imagen subida
    temp_image_path = f"temp_{file.filename}"
    with open(temp_image_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        # Clasificar la imagen
        result = classify_pet_api(temp_image_path)
        return result
    finally:
        # Eliminar la imagen temporal
        os.remove(temp_image_path)