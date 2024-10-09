from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config import get_db
from app.models.estado_perro import EstadoPerro
from app.models.perrito import Perrito
from pydantic import BaseModel
from datetime import date

router = APIRouter()

class EstadoPerroNuevo(BaseModel):
    descripcion: str
    direccion_visto: str 
    fecha: date
    estado: int

class PerritoNuevo(BaseModel) :
    raza: str
    color: str
    genero: str
    nombre: str
    usuario_id: int
    estado_perro_id: int


@router.post("/estado")
def registrar_estado(estado_perro: EstadoPerroNuevo, db: Session = Depends(get_db)):
    new_estado_perro = EstadoPerro(descripcion=estado_perro.descripcion, 
                                   direccion_visto=estado_perro.direccion_visto, 
                                   fecha=estado_perro.fecha, 
                                   estado=estado_perro.estado)
    db.add(new_estado_perro)
    db.commit()
    db.refresh(new_estado_perro)
    return {new_estado_perro}

@router.post("/data")
def resgistrar_perro(perrito: PerritoNuevo, db: Session = Depends(get_db)):
    new_perrito = Perrito(raza=perrito.raza, 
                               color=perrito.color, 
                               genero=perrito.genero, 
                               nombre=perrito.nombre,
                               usuario_id=perrito.usuario_id,
                               estado_perro_id=perrito.estado_perro_id)
    db.add(new_perrito)
    db.commit()
    db.refresh(new_perrito)
    return {new_perrito}