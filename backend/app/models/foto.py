from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.config import Base

class Foto(Base):
    __tablename__ = "foto"

    id = Column(Integer, primary_key=True, index=True)
    direccion_foto = Column(String(150), nullable=False)  # Ruta de la imagen
    perrito_id = Column(Integer, ForeignKey('perrito.id'), nullable=False)

    perro = relationship("Perrito", back_populates="foto_perro")
