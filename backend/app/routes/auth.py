from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from datetime import datetime, timedelta
from app.config import get_db
from app.models.usuario import Usuario
from app.models.rol import Rol
from pydantic import BaseModel, EmailStr
from fastapi.responses import JSONResponse


router = APIRouter()

# Configuración de JWT
SECRET_KEY = "Choquito"  # clave para cambiar
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 0.1

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

class UserLogin(BaseModel):
    correo: EmailStr
    password: str

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# Ruta para iniciar sesión
@router.post("/login")
def login(user: UserLogin, response: Response, db: Session = Depends(get_db)):
    db_user = db.query(Usuario).filter(Usuario.correo == user.correo).first()
    if not db_user or db_user.password != user.password:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    # Crear y almacenar el token en una cookie segura
    access_token = create_access_token(data={"sub": db_user.correo})
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,  # Usa False para pruebas locales si no tienes HTTPS
        samesite="Lax",  # Cambia a 'Lax' si necesitas más flexibilidad
        domain="localhost"
    )

    return {"message": "Login exitoso", "user": db_user, "access_token": access_token}

# Ruta para registrar un nuevo usuario
@router.post("/register", status_code=201)
def register(user: UserRegister, db: Session = Depends(get_db)):
    # Verificar si el correo ya está registrado
    db_user = db.query(Usuario).filter(Usuario.correo == user.correo).first()
    if db_user:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")
    
    # Crear y guardar el nuevo usuario
    db_rol = db.query(Rol).filter(Rol.rol == 'user').first()

    new_user = Usuario(
        nombre=user.nombre,
        correo=user.correo,
        password=user.password,  #sin hashear
        direccion=user.direccion,
        num_celular=user.num_celular,
        rol_id=db_rol.id,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Crear token JWT para el nuevo usuario
    access_token = create_access_token(data={"sub": new_user.correo})
    return {"message": "Usuario registrado exitosamente", "access_token": access_token}


@router.get("/profile")
def profile(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="No autenticado")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email = payload.get("sub")
        if user_email is None:
            raise HTTPException(status_code=401, detail="Token inválido")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")

    return {"message": "Token válido", "user_email": user_email}