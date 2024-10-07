from sqlalchemy import Column, Integer, String, Date, SmallInteger
from app.config import Base

class EstadoPerro(Base):
    __tablename__ = "estado_perro"

    id = Column(Integer, primary_key=True, index=True)
    descripcion = Column(String(500), nullable=False)
    direccion_visto = Column(String(200), nullable=False)
    fecha = Column(Date, nullable=False)
    estado = Column(Integer, nullable=False)
