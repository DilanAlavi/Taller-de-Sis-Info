from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.perrito import Perrito
from app.models.estado_perro import EstadoPerro
from app.models.foto import Foto
from app.config import get_db
from pathlib import Path
from PIL import Image

router = APIRouter()

# Ruta para reportar un perrito perdido con imagen
@router.post("/reportar_perrito_perdido")
async def reportar_perrito(
    nombre: str = Form(...),
    descripcion: str = Form(...),
    contacto: str = Form(...),
    fecha: str = Form(...),
    estado: int = Form(...),
    usuario_id: int = Form(...),
    foto: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    # Crear el registro del perrito en la base de datos
    nuevo_estado = EstadoPerro(
        descripcion=descripcion,
        direccion_visto="",  # Agregar si es necesario
        fecha=fecha,
        estado=estado  # 1 = perdido, 0 = encontrado
    )
    db.add(nuevo_estado)
    db.commit()
    db.refresh(nuevo_estado)

    nuevo_perrito = Perrito(
        nombre=nombre,
        descripcion=descripcion,
        contacto=contacto,
        fecha=fecha,
        usuario_id=usuario_id,
        estado_perro_id=nuevo_estado.id
    )
    db.add(nuevo_perrito)
    db.commit()
    db.refresh(nuevo_perrito)

    # Manejo de la imagen (si fue subida)
    if foto:
        carpeta_perro = Path(f"E:/Univerisda/2024-2/taller de sisinfo proyecto/imagenes/{nuevo_perrito.id}")
        carpeta_perro.mkdir(parents=True, exist_ok=True)  # Crear la carpeta si no existe

        # Guardar la imagen en formato JPG
        imagen = Image.open(foto.file)
        ruta_imagen = carpeta_perro / f"{nuevo_perrito.id}.jpg"
        imagen.save(ruta_imagen, format="JPEG")

        # Guardar la ruta de la imagen en la base de datos
        nueva_foto = Foto(
            direccion_foto=str(ruta_imagen),
            perrito_id=nuevo_perrito.id
        )
        db.add(nueva_foto)
        db.commit()

    return {"message": "Reporte enviado exitosamente", "perrito_id": nuevo_perrito.id}
