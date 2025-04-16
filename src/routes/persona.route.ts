import express, { Request, Response, NextFunction } from "express";
import * as personaController from "../controllers/persona.controller";

const router = express.Router();
//RUTAS PARA EL ENDPOINT DE PERSONAS
router.get("/consulta/personas", (req: Request, res: Response, next: NextFunction) => {
  personaController.getPersonas(req, res);
});

router.get("/consulta/persona/:id", (req: Request, res: Response, next: NextFunction) => {
  personaController.getPersona(req, res);
});

export default router;
