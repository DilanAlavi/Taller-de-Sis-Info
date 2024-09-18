from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config import get_db
from app.models.usuario import Usuario
from pydantic import BaseModel

router = APIRouter()

class UserLogin(BaseModel):
    correo: str
    password: str

class UserRegister(BaseModel):
    correo: str
    password: str
    mascota: str

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(Usuario).filter(Usuario.correo == user.correo).first()
    if not db_user or db_user.password != user.password:
        raise HTTPException(status_code=400, detail="Correo o contraseña incorrectos")
    return {"message": "Login exitoso"}

@router.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):
    db_user = db.query(Usuario).filter(Usuario.correo == user.correo).first()
    if db_user:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")
    new_user = Usuario(correo=user.correo, password=user.password, Mascota=user.mascota)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "Usuario registrado exitosamente"}