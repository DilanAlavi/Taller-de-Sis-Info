from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from app.config import get_db
from app.models.perrito import Perrito
from app.models.estado_perro import EstadoPerro
from app.schemas.perrito import PerritoUpdate
from app.models.foto import Foto
from app.models.usuario import Usuario

router = APIRouter()

def get_id_usuario(x_user_id: str = Header(None)):
    if not x_user_id:
        raise HTTPException(status_code=400, detail="User ID no proporcionado")
    return int(x_user_id)

def es_propietario_perrito(perrito_id: int, user_id: int, db: Session) -> bool:
    perrito = db.query(Perrito).filter(Perrito.id == perrito_id).first()
    if not perrito:
        raise HTTPException(status_code=404, detail="Perrito no encontrado")
    
    # Aquí se verifica si el ID del usuario coincide con el propietario del perrito
    return perrito.usuario_id == user_id  # Esto compara el usuario que posee el perrito



@router.get("/")
def get_perritos(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    perritos = db.query(Perrito).offset(skip).limit(limit).all()
    
    result = []
    for perro in perritos :
        result.append({
        "id": perro.id,
        "nombre": perro.nombre,
        "raza": perro.raza,
        "color": perro.color,
        "genero": perro.genero,
        "estado": perro.estado_perro,
        "usuario": perro.usuario,
        "foto": perro.foto_perro
    })
    return result

@router.get("/estados/{estado_id}")
def get_estado(estado_id: int, db: Session = Depends(get_db)):
    estado = db.query(EstadoPerro).filter(EstadoPerro.id == estado_id).first()
    if not estado:
        raise HTTPException(status_code=404, detail="Estado de perrito no encontrado")
    return estado

@router.get("/estados")
def get_estados(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    estados = db.query(EstadoPerro).offset(skip).limit(limit).all()
    return estados


@router.get("/{perrito_id}")
def get_perrito(perrito_id: int, db: Session = Depends(get_db)):
    perrito = db.query(Perrito).filter(Perrito.id == perrito_id).first()
    if not perrito:
        raise HTTPException(status_code=404, detail="Perrito no encontrado")

    return {
        "id": perrito.id,
        "nombre": perrito.nombre,
        "raza": perrito.raza,
        "color": perrito.color,
        "genero": perrito.genero,
        "estado": perrito.estado_perro,
        "usuario": perrito.usuario,
        "foto": perrito.foto_perro,
    }

@router.put("/{perrito_id}")
def editar_perrito(
    perrito_id: int, 
    perrito_data: PerritoUpdate, 
    db: Session = Depends(get_db),
    user_id: int = Depends(get_id_usuario)
):
    print(f"Verificando propiedad del perrito con ID: {perrito_id} para el usuario con ID: {user_id}")
    
    if not es_propietario_perrito(perrito_id, user_id, db):
        raise HTTPException(status_code=403, detail="No tienes permiso para editar este perrito")

    perrito = db.query(Perrito).filter(Perrito.id == perrito_id).first()

    # Actualizar los campos básicos
    for field, value in perrito_data.dict(exclude_unset=True).items():
        if field == "estado":  # Si el campo es 'estado', actualizamos los campos anidados
            for estado_field, estado_value in value.dict(exclude_unset=True).items():
                setattr(perrito.estado, estado_field, estado_value)  # Aquí 'estado' debe ser un objeto relacionado
        else:
            setattr(perrito, field, value)

    db.commit()
    db.refresh(perrito)

    return {"message": "Perrito actualizado exitosamente", "perrito": perrito}


@router.delete("/{perrito_id}")
def eliminar_perrito(
    perrito_id: int, 
    db: Session = Depends(get_db), 
    user_id: int = Depends(get_id_usuario)
):
    if not es_propietario_perrito(perrito_id, user_id, db):
        raise HTTPException(status_code=403, detail="No tienes permiso para eliminar este perrito")

    perrito = db.query(Perrito).filter(Perrito.id == perrito_id).first()
    fotos = db.query(Foto).filter(Foto.perrito_id == perrito_id).all()
    for foto in fotos:
        db.delete(foto)

    estados = db.query(EstadoPerro).filter(EstadoPerro.id == perrito.estado_perro_id).all()
    for estado in estados:
        db.delete(estado)

    db.delete(perrito)
    db.commit()

    return {"message": "Perrito, sus fotos y estados eliminados exitosamente", "perrito_id": perrito_id}
