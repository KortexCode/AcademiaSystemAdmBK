import * as loginController from "../controllers/login.controller";
import express from "express";

const router = express.Router();

router.post('/', loginController.postLoginInit);
router.post('/cerrar/sesion', loginController.postLoginInit);
router.put('/actualizar/password', loginController.putForgotPassword);
router.post('/crear/usuario', loginController.postUserCreate);
router.post('/validar-usuario', loginController.postUserValidate);
router.post('/validar-correo', loginController.postEmailValidate);
router.post('/validar-codigo', loginController.postCodeValidate);
router.post('/validar-password', loginController.postUserCreate);


export default router;
