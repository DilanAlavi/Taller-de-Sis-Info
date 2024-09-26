from fastapi import APIRouter, UploadFile, File
from ...ml.image_classifier import classify_image
import shutil
import os

router = APIRouter()

@router.post("/clasificar")
async def clasificar_imagen(file: UploadFile = File(...)):
    temp_file = f"temp_{file.filename}"
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    result = classify_image(temp_file)
    os.remove(temp_file)
    
    return {"resultado": result}