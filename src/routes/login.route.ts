import * as loginController from "../controllers/login.controller";
import express from "express";

const router = express.Router();

router.post('/inicio-sesion', loginController.postLoginInit);
router.post('/cerrar-sesion', loginController.postLoginInit);
router.post('/crear-usuario', loginController.postUserCreate);
router.put('/actualizar-password', loginController.putPasswordUpdate);
router.post('/validar-usuario', loginController.postUserValidate);
router.post('/validar-correo', loginController.postEmailValidate);
router.post('/validar-codigo', loginController.postCodeValidate);


export default router;


