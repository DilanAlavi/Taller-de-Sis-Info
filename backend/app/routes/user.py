from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.config import get_db
from app.models.usuario import Usuario

router = APIRouter()

class UserUpdate(BaseModel):
    nombre: str | None = None
    correo: str | None = None
    direccion: str | None = None
    num_celular: int | None = None  

@router.get("/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user

@router.get("/")
def get_users(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    users = db.query(Usuario).offset(skip).limit(limit).all()
    return users

@router.put("/edit/{user_id}")
def edit_user(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)) :
    user = db.query(Usuario).filter(Usuario.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    for key, value in user_update.dict(exclude_unset=True).items():
        setattr(user, key, value)

    db.commit()
    db.refresh(user)
    return user