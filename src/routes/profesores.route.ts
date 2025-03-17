import express from "express";
import * as profesorController from "../controllers/profesores.controller";

const router = express.Router();

router.get("/consulta/profesores", profesorController.getProfesores);

export default router;
