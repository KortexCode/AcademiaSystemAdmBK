import express from "express";
import * as aprendizController from "../controllers/aprendiz.controller";

const router = express.Router();
//RUTAS PARA EL ENDPOINT DE PRODUCTOS
router.get("/consulta/aprendices", aprendizController.getAprendices);
router.get("/consulta/aprendiz/:id", aprendizController.getAprendiz);

export default router;
