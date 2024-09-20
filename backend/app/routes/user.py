from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config import get_db
from app.models.usuario import Usuario

router = APIRouter()

@router.get("/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user

@router.get("/")
def get_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    users = db.query(Usuario).offset(skip).limit(limit).all()
    return users