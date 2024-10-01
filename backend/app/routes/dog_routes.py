from fastapi import APIRouter, UploadFile, File
from app.ml.dog_classifier import classify_dog_api # Importación absoluta
import shutil
import os

router = APIRouter()

@router.post("/classify")
async def classify_dog(file: UploadFile = File(...)):
    temp_file = f"temp_{file.filename}"
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        result = classify_dog_api(temp_file)
        return result
    finally:
        os.remove(temp_file)