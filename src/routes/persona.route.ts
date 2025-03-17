import express from "express";
import * as personaController from "../controllers/persona.controller";

const router = express.Router();
//RUTAS PARA EL ENDPOINT DE PRODUCTOS
router.get("/consulta/personas", personaController.getPersonas);
router.get("/consulta/persona/:id", personaController.getPersona);

export default router;
