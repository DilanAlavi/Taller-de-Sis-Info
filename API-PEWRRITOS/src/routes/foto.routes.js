import { Router } from "express";
import { getFoto } from "../controllers/foto.controller.js";


const router = Router();
router.get('/fotos', getFoto)

export default router