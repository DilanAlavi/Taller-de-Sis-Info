from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
import os
import tempfile


router = APIRouter()

# Ruta de la carpeta en Google Drive
FOLDER_ID = '1PVLp1yfjdZg1z1MiNeApUVGbuuL_hyUb'  # Reemplaza esto con tu ID de carpeta de Google Drive
# SERVICE_ACCOUNT_FILE = 'backend/app/credencials/fotos-perritos-809194cdb9d7.json'  # Ruta al archivo de credenciales
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SERVICE_ACCOUNT_FILE = os.path.join(BASE_DIR, '..', 'credencials', 'fotos-perritos-809194cdb9d7.json')



# Configuración de credenciales y cliente de Google Drive
credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=['https://www.googleapis.com/auth/drive.file']
)

service = build('drive', 'v3', credentials=credentials)

@router.post("/foto/subir")
async def subir_foto(foto: UploadFile = File(...)):
    # Guardar el archivo temporalmente antes de subirlo a Google Drive
    # temp_file_path = f"/tmp/{foto.filename}"
    
    # with open(temp_file_path, "wb") as buffer:
    #     buffer.write(await foto.read())

    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        contents = await foto.read()
        temp_file.write(contents)
        temp_file_path = temp_file.name  # El nombre del archivo temporal

    file_metadata = {
        'name': foto.filename,
        'parents': [FOLDER_ID]
    }
    media = MediaFileUpload(temp_file_path, mimetype=foto.content_type)
    
    file = service.files().create(body=file_metadata, media_body=media, fields='id').execute()
    
    try : 
        os.remove(temp_file_path)
    except PermissionError:
        print(f"No se puede eliminar el archivo: {temp_file_path} está en uso.")
    except Exception as e:
        print(f"Ocurrió un error al intentar eliminar el archivo: {e}")

    return JSONResponse(content={"message": "Imagen subida a Google Drive", "file_id": file.get('id')})