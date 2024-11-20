from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from datetime import datetime, timedelta
from app.config import get_db
from app.models.usuario import Usuario
from pydantic import BaseModel, EmailStr

router = APIRouter()

# Configuración de JWT
SECRET_KEY = "Choquito"  # clave para cambiar
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Modelos 
class UserLogin(BaseModel):
    correo: EmailStr
    password: str

class UserRegister(BaseModel):
    nombre: str
    correo: EmailStr
    password: str
    num_celular: int
    direccion: str

class Token(BaseModel):
    access_token: str
    token_type: str

# crear tokens
def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Ruta para iniciar sesión
@router.post("/login")
# , response_model=Token
def login(user: UserLogin, db: Session = Depends(get_db)):
    # Buscar usuario en la base de datos
    db_user = db.query(Usuario).filter(Usuario.correo == user.correo).first()
    if not db_user or db_user.password != user.password:  # Contraseña sin hashear
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Correo o contraseña incorrectos",
        )
    # Crear token JWT
    access_token = create_access_token(data={"sub": db_user.correo})
    return {"access_token": access_token, "token_type": "bearer", "user": db_user}

# Ruta para registrar un nuevo usuario
@router.post("/register", status_code=201)
def register(user: UserRegister, db: Session = Depends(get_db)):
    # Verificar si el correo ya está registrado
    db_user = db.query(Usuario).filter(Usuario.correo == user.correo).first()
    if db_user:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")
    
    # Crear y guardar el nuevo usuario
    new_user = Usuario(
        nombre=user.nombre,
        correo=user.correo,
        password=user.password,  #sin hashear
        direccion=user.direccion,
        num_celular=user.num_celular,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Crear token JWT para el nuevo usuario
    access_token = create_access_token(data={"sub": new_user.correo})
    return {"message": "Usuario registrado exitosamente", "access_token": access_token}
