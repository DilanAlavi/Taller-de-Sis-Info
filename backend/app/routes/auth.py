from fastapi import APIRouter, Depends, HTTPException, status, Response, Request, Header
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone
from app.config import get_db
from app.models.usuario import Usuario
from app.models.rol import Rol
from pydantic import BaseModel, EmailStr
from fastapi.responses import JSONResponse
import uuid


router = APIRouter()
session_id = str(uuid.uuid4())

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

class UserLogin(BaseModel):
    correo: EmailStr
    password: str

def create_access_token(data: dict, session_id: str) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=30)
    to_encode.update({
        "exp": expire,
        "session_id": session_id  
    })
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)



@router.post("/login")
def login(user: UserLogin, response: Response, db: Session = Depends(get_db)):
    db_user = db.query(Usuario).filter(Usuario.correo == user.correo).first()
    if not db_user or db_user.password != user.password:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    
    # Generar un nuevo session_id
    session_id = str(uuid.uuid4())

    # Actualiza el usuario con el nuevo session_id
    db_user.session_id = session_id  # Asegúrate de tener este campo en el modelo de usuario
    db.commit()
    db.refresh(db_user)

    access_token = create_access_token(data={"sub": db_user.correo}, session_id=session_id)
    return {"message": "Login exitoso", "user": {"nombre": db_user.nombre, "correo": db_user.correo, "rol_id": db_user.rol_id}, "access_token": access_token}



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
    user_email = token.get("sub")
    session_id = token.get("session_id")

    if not user_email or not session_id:
        raise HTTPException(status_code=401, detail="Token inválido")

    # Consulta al usuario en la base de datos
    db_user = db.query(Usuario).filter(Usuario.correo == user_email).first()

    if not db_user or db_user.session_id != session_id:
        raise HTTPException(status_code=401, detail="Sesión inválida o cerrada")

    return {"message": "Token válido", "user_email": user_email}

