from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, user, pet_routes, dog_routes, registrar_perrito, perritos, registrar_foto, subir_imagen
from app.config import engine
from app.models import usuario

usuario.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Origen de tu aplicación React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir todas las rutas
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(user.router, prefix="/users", tags=["users"])
app.include_router(pet_routes.router, prefix="/pets", tags=["pets"])
app.include_router(registrar_perrito.router, prefix="/perro", tags=["perro"])
app.include_router(perritos.router, prefix="/perritos", tags=["perritos"])
app.include_router(registrar_foto.router, prefix="/foto", tags=["foto"])
app.include_router(subir_imagen.router)
# app.include_router(dog_routes.router, prefix="/dogs", tags=["dogs"])

@app.get("/")
async def root():
    return {
        "message": "Bienvenido a la API del Taller de Sistemas de Información y Reconocimiento de Razas de Perros"
    }

@app.get("/hello")
async def hello():
    return {"message": "Hola Papa Jhuls"}