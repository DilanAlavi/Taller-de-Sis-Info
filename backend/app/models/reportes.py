from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.config import Base

class Reporte(Base):
    __tablename__ = "reportes"

    id = Column(Integer, primary_key=True, index=True)
    motivo = Column(String(50), nullable=False)
    descripcion = Column(String(250), nullable=False)
    usuario_id = Column(Integer, ForeignKey('usuario.id'), nullable=False)

    usuario = relationship("Usuario", back_populates="reporte_usuario")