from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config import get_db
from app.models.foto import Foto
from pydantic import BaseModel
from datetime import date

router = APIRouter()

class RegistroFoto(BaseModel) :
    direccion_foto: str
    perrito_id: int

@router.post("/post")
def registrar_foto(foto: RegistroFoto, db: Session = Depends(get_db)):
    new_foto = Foto(direccion_foto=foto.direccion_foto, 
                    perrito_id=foto.perrito_id)
    db.add(new_foto)
    db.commit()
    db.refresh(new_foto)
    return {new_foto}
