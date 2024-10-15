import express from "express";
import cors from "cors";
import { pool } from './db.js';
import estadoPerroRoutes from "./routes/estado_perro.routes.js";
import perritoRoutes from "./routes/perrito.routes.js";
import fotosRoutes from "./routes/foto.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";



const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
}));



// Define tus rutas
app.use(usuarioRoutes);
app.use(perritoRoutes);
app.use(fotosRoutes);
app.use(estadoPerroRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error en el servidor');
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
