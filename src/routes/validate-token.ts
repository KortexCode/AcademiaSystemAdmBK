import { config } from "../../config/configDotenv";
import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken"

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  console.log("EL HEADER AUTH", token)
  try {
    if (token && token?.startsWith("Bearer")) {
      //Extraemos la palabra 'Bearer' del token para sólo usar la codificación
      const bearerToken = token.slice(7);
      //Verificamos el token y lo obtenemos
      const tokeVerified = jwt.verify(bearerToken, config.secretPassword);
      console.log("token verificado", tokeVerified, );
      next();
    } else {
      res.status(401).json({
        message: "Acceso denegado",
      });
    }
  } catch (error) {
    //Si el token era errado o no existe capturamos el intento de conexión fraudulenta
    res.status(401).json({
      message: "Intento de inicio de sección inseguro",
      error,
    });
  }
};

export default validateToken;
