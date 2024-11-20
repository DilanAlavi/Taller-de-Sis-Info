from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.config import Base

class Usuario(Base):
    __tablename__ = "usuario"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(150))
    correo = Column(String(75))
    password = Column(String(45))
    direccion = Column(String(200))
    num_celular = Column(Integer)

    comentario_perro = relationship("Comentario", back_populates="usuario")
    reporte_usuario = relationship("Reporte", back_populates="usuario")