import express from "express";
import {
  getPersona,
  getPersonas,
  postPersona,
  putPersona,
} from "../controllers/persona.controller";

const router = express.Router();
//RUTAS PARA EL ENDPOINT DE PRODUCTOS
router.get("/", getPersonas);
router.get("/:id", getPersona);
router.post("/", postPersona);
router.put("/:id", putPersona);

export default router;
