from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.config import Base

class Comentario(Base):
    __tablename__ = "comentarios"

    id = Column(Integer, primary_key=True, index=True)
    comentario = Column(String(250), nullable=False)  # Ruta de la imagen
    perrito_id = Column(Integer, ForeignKey('perrito.id'), nullable=False)
    usuario_id = Column(Integer, ForeignKey('usuario.id'), nullable=False)

    perro = relationship("Perrito", back_populates="comentario_perro")
    usuario = relationship("Usuario", back_populates="comentario_perro")