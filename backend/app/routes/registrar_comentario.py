from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config import get_db
from app.models.comentarios import Comentario
from pydantic import BaseModel
from datetime import date

router = APIRouter()

class ComentarioNuevo(BaseModel):
    comentario: str | None = None
    perrito_id: int | None = None
    usuario_id: int| None = None


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
    comentarios = db.query(Comentario).filter(Comentario.perrito_id == comentario_id_perrito).all()
    if not comentarios:
        raise HTTPException(status_code=404, detail="Comentarios de perrito no encontrados")
    
    result = []
    for comentario in comentarios :
        result.append({
            "id": comentario.id,
            "comentario": comentario.comentario,
            "perrito_id": comentario.perrito_id,
            "usuario": comentario.usuario
        })
    return result

@router.get("")
def get_estados(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    comentarios = db.query(Comentario).offset(skip).limit(limit).all()
    result = []
    for comentario in comentarios :
        result.append({
            "id": comentario.id,
            "comentario": comentario.comentario,
            "perrito_id": comentario.perrito_id,
            "usuario": comentario.usuario
        })
    return result

@router.put("/edit/{comentario_id}")
def edit_comentario(comentario_id: int, comentario_update: ComentarioNuevo, db: Session = Depends(get_db)) :
    comentario = db.query(Comentario).filter(Comentario.id == comentario_id).first()
    if not comentario:
        raise HTTPException(status_code=404, detail="Comentario no encontrado")

    for key, value in comentario_update.dict(exclude_unset=True).items():
        setattr(comentario, key, value)

    db.commit()
    db.refresh(comentario)
    return comentario

@router.delete("/delete/{comentario_id}")
def delete_comentario(comentario_id: int, db: Session = Depends(get_db)):
    comentario = db.query(Comentario).filter(Comentario.id == comentario_id).first()
    db.delete(comentario)
    db.commit()

    return {"message": "Se eliminó el comentario exitosamenee", "comentario_id": comentario_id}