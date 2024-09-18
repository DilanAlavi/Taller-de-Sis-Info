from sqlalchemy import Column, Integer, String
from app.config import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    idusuarios = Column(Integer, primary_key=True, index=True)
    correo = Column(String(45))
    password = Column(String(45))
    Mascota = Column(String(45))
    usuarioscol = Column(String(45))