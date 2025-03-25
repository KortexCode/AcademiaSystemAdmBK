import { Response, Request } from "express";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import { loginModel } from "../models/login.model";
import { config } from "../../config/config";

//Inciar sección
export const postLoginInit = async (req: Request, res: Response) => {
  const { user_name, password } = req.body;
  try {
    const userFounded = await loginModel.findOne({
      where: {
        user_name,
      },
    });

    //Se crea un token para el inicio de sección del usuario
    if (userFounded) {
      const { user_password } = userFounded?.dataValues;
      //Verificamos que la contraseña ingresada se la misma que la decodificada
      const passwordValidated = await bcrypt.compare(password, user_password);

      if (passwordValidated) {
        await loginModel.update(
          { estado_login: true },
          {
            where: {
              user_name,
            },
          },
        );
        const token = jwt.sign(
          {
            sub: "login",
            user: user_name,
          },
          config.secretPassword,
        );

        res.json({
          token,
          status: "true",
          message: `Inicio de sesión Válido.`,
        });
      } else {
        res.json({
          status: "false",
          message: "La contraseña inválida",
        });
      }
    } else {
      res.json({
        status: "false",
        message: "El nombre de usuario no existe",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Error de servidor",
      error,
    });
  }
};
//Finalizar sesión
export const postLoginFinish = async (req: Request, res: Response) => {
  const { user_name } = req.body;
  try {
    const userFounded = await loginModel.findOne({
      where: {
        user_name,
      },
    });
    //Se crea un token para el inicio de sección del usuario
    if (userFounded) {
      await loginModel.update(
        { estado_login: false },
        {
          where: {
            user_name,
          },
        },
      );
      res.json({
        status: "true",
        message: `Ha cerrado sesión con éxito.`,
      });
    } else {
      res.json({
        status: "false",
        message: "No se puede cerrar sesión, comuníquese con soporte",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Error de servidor",
      error,
    });
  }
};
//Crear un usuario
export const postUserCreate = async (req: Request, res: Response) => {
  const { user_name, password, fha_created } = req.body;

  try {
    const user_password = await bcrypt.hash(password, 10);
    //Consultamos si el usuario existe
    const userFounded = await loginModel.findOne({
      where: {
        user_name,
      },
    });

    if (userFounded) {
      const { user_name } = userFounded!.dataValues;
      res.json({
        status: "false",
        message: `El usuario ${user_name} ya existe`,
      });
    } else {
      await loginModel.create({
        user_name,
        user_password,
        fha_created,
      });
      res.json({
        status: "true",
        message: `El usuario ${user_name} ha sido creado`,
      });
    }
  } catch (error) {
    console.log("error de servidor");
    //Enviamos mensaje de error
    res.status(404).json({
      message: "error",
      error,
    });
  }
};
//Actualizar contraseña
export const putForgotPassword = async (req: Request, res: Response) => {
  try {
    const { user_name, password } = req.body;
    //Consultamos si el usuario existe
    const userFounded = await loginModel.findOne({
      where: {
        user_name,
      },
    });

    if (userFounded) {
      //Se encripta el código
      const user_password = await bcrypt.hash(password, 10);
      //Si el usuario ya existe enviamos mensaje
      await loginModel.update(
        { user_password },
        {
          where: {
            user_name,
          },
        },
      );

      res.json({
        status: "true",
        message: `La contraseña ha sido actualizada`,
      });
    } else {
      //Creamos el usuario en la base de datos
      res.json({
        status: "false",
        message: `El usuario ${user_name} no existe`,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Error de servidor",
      error,
    });
  }
};

