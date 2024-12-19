from fastapi import APIRouter, Depends, HTTPException, status, Response, Request, Header
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone
from app.config import get_db
from app.models.usuario import Usuario
from app.models.rol import Rol
from pydantic import BaseModel, EmailStr
from fastapi.responses import JSONResponse
from passlib.context import CryptContext
from dotenv import load_dotenv
import os
import uuid

current_dir = os.path.dirname(os.path.abspath(__file__))
dotenv_path = os.path.join(current_dir, '..','.env.auth')

load_dotenv(dotenv_path=dotenv_path)

# Configuración de JWT
SECRET_KEY = os.getenv('SECRET_KEY')
print(SECRET_KEY)
ALGORITHM = os.getenv('ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', 30))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()

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


def create_access_token(data: dict, session_id: str) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({
        "exp": expire,
        "session_id": session_id  
    })
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# Función para hashear la contraseña
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

# Función para verificar la contraseña
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Ruta para login
@router.post("/login")
def login(user: UserLogin, response: Response, db: Session = Depends(get_db)):
    db_user = db.query(Usuario).filter(Usuario.correo == user.correo).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    
    # Generar un nuevo session_id
    session_id = str(uuid.uuid4())

    # Actualiza el usuario con el nuevo session_id
    db_user.session_id = session_id
    db.commit()
    db.refresh(db_user)

    access_token = create_access_token(data={"sub": db_user.correo}, session_id=session_id)
    return {
        "message": "Registro exitoso",
        "user": {
            "nombre": db_user.nombre,
            "rol_id": db_user.rol_id,
            "id": db_user.id,
        },
        "access_token": access_token
    }

# Ruta para registrar un nuevo usuario
@router.post("/register", status_code=201)
def register(user: UserRegister, db: Session = Depends(get_db)):

    db_user = db.query(Usuario).filter(Usuario.correo == user.correo).first()
    if db_user:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")

    db_rol = db.query(Rol).filter(Rol.rol == 'user').first()
    if not db_rol:
        raise HTTPException(status_code=400, detail="Rol predeterminado no encontrado")

    session_id = str(uuid.uuid4())

    new_user = Usuario(
        nombre=user.nombre,
        correo=user.correo,
        password=get_password_hash(user.password),  
        direccion=user.direccion,
        num_celular=user.num_celular,
        rol_id=db_rol.id,
        session_id=session_id
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token = create_access_token(data={"sub": new_user.correo}, session_id=session_id)

    return {
        "message": "Registro exitoso",
        "user": {
            "nombre": new_user.nombre,
            "rol_id": new_user.rol_id,
            "id": new_user.id,
        },
        "access_token": access_token
    }


def get_token_from_header(authorization: str = Header(...), db: Session = Depends(get_db)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Token no proporcionado")
    
    token = authorization.split(" ")[1]  # El formato debe ser "Bearer <token>"
    
    try:
        # Validar el token usando JWT
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email = payload.get("sub")
        session_id = payload.get("session_id")
        
        if not user_email or not session_id:
            raise HTTPException(status_code=401, detail="Token inválido")

        # Validar la sesión contra la base de datos
        db_user = db.query(Usuario).filter(Usuario.correo == user_email).first()
        if not db_user or db_user.session_id != session_id:
            raise HTTPException(status_code=401, detail="Sesión inválida o expirada")
        
        return payload  # Devolver datos válidos del token
    
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")


@router.get("/profile")
def profile(request: Request, db: Session = Depends(get_db), token: dict = Depends(get_token_from_header)):
    session_id = token.get("session_id")
    correo_user = request.query_params.get("correo")
    if not session_id or not correo_user:
        raise HTTPException(status_code=401, detail="Token inválido")

    db_user = db.query(Usuario).filter(Usuario.correo == correo_user).first()

    if not db_user or db_user.session_id != session_id:
        raise HTTPException(status_code=401, detail="Sesión inválida o cerrada")

    return {"message": "Token válido"}
