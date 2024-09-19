from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Origen de tu aplicación React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Definir el esquema de datos para el login
class LoginData(BaseModel):
    username: str
    password: str

# Ruta para el endpoint de login
@app.post("/login")
async def login(data: LoginData):
    correct_username = "user"
    correct_password = "123"
    
    if data.username == correct_username and data.password == correct_password:
        return {"success": True}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

# Ruta de prueba para verificar que el servidor funciona
@app.get("/hello")
async def hello():
    return {"message": "Hola Papa Jhuls"}

