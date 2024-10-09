from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
import os
import tempfile


router = APIRouter()

# Ruta de la carpeta en Google Drive
FOLDER_ID = '1PVLp1yfjdZg1z1MiNeApUVGbuuL_hyUb' 

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SERVICE_ACCOUNT_FILE = os.path.join(BASE_DIR, '..', 'credencials', 'fotos-perritos-809194cdb9d7.json')



# Configuración de credenciales y cliente de Google Drive
credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=['https://www.googleapis.com/auth/drive.file']
)

service = build('drive', 'v3', credentials=credentials)

@router.post("/foto/subir")
async def subir_foto(foto: UploadFile = File(...)):
    try: 
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            contents = await foto.read()
            temp_file.write(contents)
            temp_file_path = temp_file.name 

        file_metadata = {
            'name': foto.filename,
            'parents': [FOLDER_ID]
        }
        media = MediaFileUpload(temp_file_path, mimetype=foto.content_type)
        
        file = service.files().create(body=file_metadata, media_body=media, fields='id').execute()
        return JSONResponse(content={"message": "Imagen subida a Google Drive", "file_id": file.get('id')})

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al subir la imagen: {str(e)}")

    finally:
        # Intenta eliminar el archivo temporal
        if os.path.exists(temp_file_path):
            try:
                os.remove(temp_file_path)
            except OSError as e:
                print(f"Error al eliminar el archivo temporal: {e}")
        else:
            print("El archivo temporal ya no existe.")