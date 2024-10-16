from fastapi import APIRouter
from fastapi.responses import Response
import aiohttp

router = APIRouter()

@router.get("/imagen/{file_id}")
async def obtener_imagen(file_id: str):
    url = f"https://drive.google.com/uc?export=view&id={file_id}"
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status == 200:
                image_data = await response.read()  # Leer el contenido de la imagen
                return Response(content=image_data, media_type='image/jpeg')  # Devolver la imagen
            else:
                return {"error": "No se pudo obtener la imagen"}

