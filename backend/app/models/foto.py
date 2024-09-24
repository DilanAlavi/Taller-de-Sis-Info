from sqlalchemy import Column, Integer, String
from app.config import Base

class Foto(Base):
    __tablename__ = "foto"

    id = Column(Integer, primary_key=True, index=True)
    direccion_foto = Column(String(150), nullable=False)  # Ruta de la imagen
    perrito_id = Column(Integer, nullable=False)  # ID del perrito relacionado
