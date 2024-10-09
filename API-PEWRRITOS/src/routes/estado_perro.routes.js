import { Router } from "express";
import { getEstadoPerro } from "../controllers/estado_perro.controller.js";


const router = Router();

router.get('/estadoPerro', getEstadoPerro)
export default router