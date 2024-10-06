from fastapi import APIRouter, UploadFile, File
from app.ml.classifier import classify_pet_api
import shutil
import os

router = APIRouter()

@router.post("/classify_pet")
async def classify_pet(file: UploadFile = File(...)):
    temp_image_path = f"temp_{file.filename}"
    with open(temp_image_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    if not os.path.exists(temp_image_path):
        return {"error": "El archivo temporal no se ha creado."}

    if not os.path.exists(temp_image_path):
        return {"error": "No se pudo guardar la imagen temporal"}

    try:
        # clasificar la imagen
        result = classify_pet_api(temp_image_path)
        print(result)
        return result
    finally:
        os.remove(temp_image_path)
