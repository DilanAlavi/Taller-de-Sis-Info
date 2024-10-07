from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config import get_db
from app.models.estado_perro import EstadoPerro
from pydantic import BaseModel
from datetime import date

router = APIRouter()

class EstadoPerroNuevo(BaseModel):
    descripcion: str
    direccion_visto: str 
    fecha: date
    estado: int


@router.post("/estado")
def register(estado_perro: EstadoPerroNuevo, db: Session = Depends(get_db)):
    new_estado_perro = EstadoPerro(descripcion=estado_perro.descripcion, 
                                   direccion_visto=estado_perro.direccion_visto, 
                                   fecha=estado_perro.fecha, 
                                   estado=estado_perro.estado)
    db.add(new_estado_perro)
    db.commit()
    db.refresh(new_estado_perro)
    return {"message": "Estado de perro registrado exitosamente"}