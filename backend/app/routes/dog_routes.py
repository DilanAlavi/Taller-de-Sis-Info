# app/routes/dog_routes.py
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.config import get_db
from app.ml.dog_classifier import DogClassifier
from app.models.perrito import Perrito
from app.models.estado_perro import EstadoPerro
from app.models.foto import Foto
import shutil
import os
from datetime import datetime

router = APIRouter()

# Definir las razas soportadas
SUPPORTED_BREEDS = {
    'golden_retriever': 'Golden Retriever',
    'cocker_spaniel': 'Cocker Spaniel',
    'german_shepherd': 'Pastor Alemán',
    'pitbull': 'Pitbull'
}

@router.post("/classify")
async def classify_dog(
    file: UploadFile = File(...),
    breed: Optional[str] = Query(None, description="Filtrar por raza específica"),
    db: Session = Depends(get_db)
):
    print("\n=== Nueva solicitud de clasificación de perro ===")
    temp_file = f"temp_{file.filename}"
    try:
        # Guardar archivo temporal
        print(f"Guardando archivo temporal: {temp_file}")
        with open(temp_file, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Construir query base
        query = (
            db.query(EstadoPerro)
            .filter(EstadoPerro.estado == 0)
        )

        # Si se especifica una raza, filtrar por ella
        if breed and breed in SUPPORTED_BREEDS:
            print(f"Filtrando por raza: {SUPPORTED_BREEDS[breed]}")
            query = (
                query
                .join(Perrito)
                .filter(Perrito.raza == breed)
            )

        perros_vistos = query.all()
        print(f"Encontrados {len(perros_vistos)} perros en estado 'visto'")
        
        # Preparar información de Drive
        drive_images_info = []
        for estado_perro in perros_vistos:
            try:
                # Obtener perro asociado al estado
                perro = db.query(Perrito).filter(
                    Perrito.estado_perro_id == estado_perro.id
                ).first()
                
                if not perro:
                    print(f"No se encontró perro para estado_id: {estado_perro.id}")
                    continue

                # Obtener foto asociada al perro
                foto = db.query(Foto).filter(
                    Foto.perrito_id == perro.id
                ).first()

                if not foto:
                    print(f"No se encontró foto para perro_id: {perro.id}")
                    continue

                # Preparar info con solo los campos existentes
                info = {
                    'id': perro.id,
                    'drive_id': foto.direccion_foto,
                    'ubicacion': estado_perro.direccion_visto,
                    'fecha': estado_perro.fecha,
                    'contacto': perro.nombre,
                    'raza': perro.raza,
                    'color': perro.color,
                    'genero': perro.genero
                }
                
                print(f"\nInformación preparada para perro ID {perro.id}:")
                print(f"  - Drive ID: {foto.direccion_foto}")
                print(f"  - Ubicación: {estado_perro.direccion_visto}")
                print(f"  - Fecha: {estado_perro.fecha}")
                print(f"  - Raza: {SUPPORTED_BREEDS.get(perro.raza, perro.raza)}")
                
                drive_images_info.append(info)
                
            except Exception as e:
                print(f"Error procesando perro con estado_id {estado_perro.id}: {str(e)}")
                continue

        if not drive_images_info:
            return {
                "message": "No hay perros vistos para comparar",
                "total_perros": 0
            }

        print(f"\nIniciando clasificación con {len(drive_images_info)} imágenes...")
        
        # Clasificar y buscar coincidencias
        classifier = DogClassifier()
        result = classifier.classify_and_find_matches(temp_file, drive_images_info)
        
        # Formatear fechas en las coincidencias
        if "coincidencias" in result and result["coincidencias"]:
            for coincidencia in result["coincidencias"]:
                if isinstance(coincidencia["fecha"], datetime):
                    coincidencia["fecha"] = coincidencia["fecha"].strftime("%Y-%m-%d")
                # Traducir raza a nombre amigable
                if "raza" in coincidencia:
                    coincidencia["raza"] = SUPPORTED_BREEDS.get(
                        coincidencia["raza"], 
                        coincidencia["raza"]
                    )
        
        return result

    except Exception as e:
        print(f"\nError en classify_dog: {str(e)}")
        import traceback
        print(traceback.format_exc())
        return {"error": f"Error en el proceso: {str(e)}"}
    
    finally:
        # Limpiar archivo temporal
        if os.path.exists(temp_file):
            try:
                os.remove(temp_file)
                print(f"Archivo temporal {temp_file} eliminado")
            except Exception as e:
                print(f"Error eliminando archivo temporal: {str(e)}")

@router.get("/test-db")
async def test_db(
    db: Session = Depends(get_db),
    breed: Optional[str] = Query(None, description="Filtrar por raza específica")
):
    """Endpoint de prueba para verificar la base de datos"""
    try:
        query = (
            db.query(Perrito, EstadoPerro, Foto)
            .join(EstadoPerro, Perrito.estado_perro_id == EstadoPerro.id)
            .join(Foto, Foto.perrito_id == Perrito.id)
            .filter(EstadoPerro.estado == 0)
        )

        # Aplicar filtro de raza si se especifica
        if breed:
            if breed not in SUPPORTED_BREEDS:
                raise HTTPException(
                    status_code=400,
                    detail=f"Raza no soportada. Razas disponibles: {list(SUPPORTED_BREEDS.values())}"
                )
            query = query.filter(Perrito.raza == breed)

        perros_vistos = query.all()

        return {
            "total_perros_vistos": len(perros_vistos),
            "perros": [
                {
                    "id": perro.id,
                    "nombre": perro.nombre,
                    "raza": SUPPORTED_BREEDS.get(perro.raza, perro.raza),
                    "color": perro.color,
                    "genero": perro.genero,
                    "ubicacion": estado.direccion_visto,
                    "fecha": estado.fecha.strftime("%Y-%m-%d"),
                    "foto_id": foto.direccion_foto
                }
                for perro, estado, foto in perros_vistos
            ]
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error consultando la base de datos: {str(e)}"
        )