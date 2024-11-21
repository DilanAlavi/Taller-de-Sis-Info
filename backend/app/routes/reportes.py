from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config import get_db
from app.models.reportes import Reporte
from pydantic import BaseModel

router = APIRouter()

class ReporteNuevo(BaseModel):
    motivo: str | None = None
    descripcion: str | None = None
    usuario_id: int| None = None


@router.post("/post")
def registrar_reporte(reporte: ReporteNuevo, db: Session = Depends(get_db)):
    new_reporte = Reporte(motivo=reporte.motivo, 
                            descripcion=reporte.descripcion,
                            usuario_id=reporte.usuario_id)
    db.add(new_reporte)
    db.commit()
    db.refresh(new_reporte)
    return {new_reporte}


@router.get("/{reporte_id_usuario}")
def get_reporte(reporte_id_usuario: int, db: Session = Depends(get_db)):
    reportes = db.query(Reporte).filter(Reporte.usuario_id == reporte_id_usuario).all()
    if not reportes:
        raise HTTPException(status_code=404, detail="Reportes de usuario no encontrados")
    
    result = []
    for reporte in reportes :
        result.append({
            "id": reporte.id,
            "motivo": reporte.motivo,
            "descripcion": reporte.descripcion,
            "usuario": reporte.usuario
        })
    return result

@router.get("")
def get_reportes(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    reportes = db.query(Reporte).offset(skip).limit(limit).all()
    result = []
    for reporte in reportes :
        result.append({
            "id": reporte.id,
            "motivo": reporte.motivo,
            "descripcion": reporte.descripcion,
            "usuario": reporte.usuario
        })
    return result

@router.delete("/delete/{reporte_id}")
def delete_reporte(reporte_id: int, db: Session = Depends(get_db)):
    reporte = db.query(Reporte).filter(Reporte.id == reporte_id).first()
    db.delete(reporte)
    db.commit()

    return {"message": "Se eliminó el reporte exitosamenee", "reporte_id": reporte_id}