from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.config import Base

class Perrito(Base):
    __tablename__ = "perrito"

    id = Column(Integer, primary_key=True, index=True)
    raza = Column(String(35), nullable=False)
    color = Column(String(15), nullable=False)
    genero = Column(String(1), nullable=False)
    nombre = Column(String(45), nullable=False)
    usuario_id = Column(Integer, ForeignKey('usuario.id', ondelete='CASCADE'), nullable=False)
    estado_perro_id = Column(Integer, ForeignKey('estado_perro.id', ondelete='CASCADE'), nullable=False)

    usuario = relationship("Usuario")  # Relación con Usuario
    estado_perro = relationship("EstadoPerro")  # Relación con EstadoPerro
    foto_perro = relationship("Foto", back_populates="perro")
    comentario_perro = relationship("Comentario", back_populates="perro", cascade="all, delete-orphan")
