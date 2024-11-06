from pydantic import BaseModel

class PerritoUpdate(BaseModel):
    nombre: str = None
    raza: str = None
    color: str = None
    genero: str = None
    estado: str = None
    usuario: str = None
    foto: str = None
