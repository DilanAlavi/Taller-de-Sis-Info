from pydantic import BaseModel
from typing import Optional

class EstadoUpdate(BaseModel):
    descripcion: Optional[str] = None
    direccion_visto: Optional[str] = None
    fecha: Optional[str] = None  # O podrías usar `datetime` si prefieres validación de fecha

class PerritoUpdate(BaseModel):
    nombre: Optional[str] = None
    raza: Optional[str] = None
    color: Optional[str] = None
    genero: Optional[str] = None
    estado: Optional[EstadoUpdate] = None  # Aquí agregamos el modelo de estado
