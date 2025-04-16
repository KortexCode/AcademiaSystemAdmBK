import express, { Request, Response, NextFunction } from "express";
import * as aprendizController from "../controllers/aprendiz.controller";

const router = express.Router();
//RUTAS PARA EL ENDPOINT DE APRENDICES
router.get("/consulta/aprendices", (req: Request, res: Response, next: NextFunction) => {
  aprendizController.getAprendices(req, res);
});

router.get("/consulta/aprendiz/:id", (req: Request, res: Response, next: NextFunction) => {
  aprendizController.getAprendiz(req, res);
});

export default router;
