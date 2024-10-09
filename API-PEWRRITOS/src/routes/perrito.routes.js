import { Router } from "express";
import { agregarPerrito, actualizarPerrito, eliminarPerrito,  getPerrito } from "../controllers/perrito.controller.js";


const router = Router();
router.get('/perritos', getPerrito);
router.post('/perrito', agregarPerrito);
router.put('/perrito/:id', actualizarPerrito); 
router.delete('/perrito/:id', eliminarPerrito);
export default router
