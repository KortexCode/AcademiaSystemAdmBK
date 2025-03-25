import * as loginController from "../controllers/login.controller";
import express from "express";

const router = express.Router();

router.post('/', loginController.postLoginInit);
router.post('/cerrar/sesion', loginController.postLoginInit);
router.put('/actualizar/password', loginController.putForgotPassword);
router.post('/crear/usuario', loginController.postUserCreate);


export default router;
