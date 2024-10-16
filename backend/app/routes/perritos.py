from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config import get_db
from app.models.perrito import Perrito
from app.models.estado_perro import EstadoPerro

router = APIRouter()

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
        "usuario": perrito.usuario
    } 

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
        "usuario": perro.usuario
    })
    return result