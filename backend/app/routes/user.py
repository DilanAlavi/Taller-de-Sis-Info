from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.config import get_db
from app.models.usuario import Usuario
from app.models.perrito import Perrito
from app.models.estado_perro import EstadoPerro
from app.models.foto import Foto
from app.models.comentarios import Comentario
# para la contraseña
from passlib.context import CryptContext


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()

class UserUpdate(BaseModel):
    nombre: str | None = None
    correo: str | None = None
    direccion: str | None = None
    num_celular: int | None = None  
    currentPassword: str | None = None
    newPassword: str | None = None 
     

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
    #contraseña
    if user_update.currentPassword and user_update.newPassword:
        if not pwd_context.verify(user_update.currentPassword, user.password):
            raise HTTPException(status_code=400, detail="Contraseña actual incorrecta")
        user.password = pwd_context.hash(user_update.newPassword)

    for key, value in user_update.dict(exclude_unset=True).items():
        setattr(user, key, value)

    db.commit()
    db.refresh(user)
    return user

@router.put("/setasadmin/{user_id}")
def set_admin(user_id: int, db: Session = Depends(get_db)) :
    user = db.query(Usuario).filter(Usuario.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    user.rol_id = 2
    db.commit()
    db.refresh(user)
    return user

@router.delete("/delete/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    perros = db.query(Perrito).filter(Perrito.usuario_id == user_id).all()
    comentarios = db.query(Comentario).filter(Comentario.usuario_id == user_id).all()

    if comentarios :
        for comentario in comentarios :
            if comentario: 
                db.delete(comentario)

    if perros: 
        for perro in perros :
            if perro:
                data = db.query(EstadoPerro).filter(EstadoPerro.id == perro.estado_perro_id).first()
                foto = db.query(Foto).filter(Foto.perrito_id == perro.id).first()
                db.delete(foto)
                db.delete(data)
                db.delete(perro)
                

    db.delete(user)
    db.commit()
    return {"detail": "Usuario eliminado con éxito"}

