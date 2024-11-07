from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config import get_db
from app.models.comentarios import Comentario
from pydantic import BaseModel
from datetime import date

router = APIRouter()

class ComentarioNuevo(BaseModel):
    comentario: str
    perrito_id: int 
    usuario_id: int


@router.post("/post")
def registrar_estado(comentario: ComentarioNuevo, db: Session = Depends(get_db)):
    new_comentario = Comentario(comentario=comentario.comentario, 
                                   perrito_id=comentario.perrito_id,
                                   usuario_id=comentario.usuario_id)
    db.add(new_comentario)
    db.commit()
    db.refresh(new_comentario)
    return {new_comentario}


@router.get("/{comentario_id_perrito}")
def get_estado(comentario_id_perrito: int, db: Session = Depends(get_db)):
    comentario = db.query(Comentario).filter(Comentario.perrito_id == comentario_id_perrito).all()
    if not comentario:
        raise HTTPException(status_code=404, detail="Comentarios de perrito no encontrados")
    return comentario

@router.get("")
def get_estados(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    comentario = db.query(Comentario).offset(skip).limit(limit).all()
    return comentario