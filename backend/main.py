from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, user
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


app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(user.router, prefix="/users", tags=["users"])

@app.get("/")
async def root():
    return {"message": "Bienvenido a la API del Taller de Sistemas de Información"}

@app.get("/hello")
async def hello():
    return {"message": "Hola Papa Jhuls"}