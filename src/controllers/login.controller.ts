import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginModel } from "../models/login.model";
import { usersModel } from "../models/users.model";
import { config } from "../../config/config";
import { generadorCodigos } from "../utils/generador_de_codigos";
import { transporter } from "../utils/mailer";
import { codigosModel } from "../models/codigos.model";
import { Op } from "sequelize";

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
          message: `Inicio de sesión exitoso.`,
        });
      } else {
        res.json({
          status: "false",
          message: "La contraseña es inválida",
        });
      }
    } else {
      res.json({
        status: "false",
        message: "El nombre de usuario no existe",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor, comuniquese con soporte",
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
export const putPasswordUpdate = async (req: Request, res: Response) => {
  try {
    const { user_name, password } = req.body;
    console.log('ver', user_name, password);
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
    res.status(500).json({
      message: "Error de servidor",
      error,
    });
  }
};
//Validar usuario
export const postUserValidate = async (req: Request, res: Response) => {
  const { numero_documento } = req.body;
  try {
    const userFounded = await usersModel.findOne({
      where: {
        numero_documento,
      },
    });
    if (userFounded) {
      res.json({
        status: "true",
        message: `El usuario ${numero_documento} existe`,
      });
    } else {
      res.json({
        status: "false",
        message: `El usuario ${numero_documento} no existe`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error de servidor",
      error,
    });
  }
};
//Validar correo
export const postEmailValidate = async (req: Request, res: Response) => {
  try {
    const { user_name, fha_genera } = req.body;
    
    const user: any = await usersModel.findOne({ attributes: ['correo'], where: { numero_documento: user_name } });
    
    if (user) {
      const codigoGenerado = generadorCodigos.generarCodigo();

      const correo = user.correo;

      const inserCodigo = {
        codigo: codigoGenerado,
        correo,
        user_name,
        estado_codigo: false,
        fha_genera,
      }
      //Crear el código en la base de datos
      await codigosModel.create(inserCodigo);
      try {
        // // Enviar el correo usando el transporter
        await transporter.sendMail({
          from: '"Tu Aplicación" <academia_system@gmail.com>',
          to: correo,
          subject: 'Código de Verificación',
          text: `Tu código de verificación es: ${codigoGenerado}`,
          html: `<p>Tu código de verificación es: <strong>${codigoGenerado}</strong></p>`,
        });

        res.json({ status: 'true', message: `Se ha enviado al correo ${correo}, el código de validación.` });

      } catch (emailError:any) {
        console.error('Error al enviar correo:', emailError);

        let errorMessage = 'Error al enviar el correo de verificación.';

        if (emailError.code === 'EAUTH') {
          errorMessage = 'Error de autenticación con el servidor de correo.';
        } else if (emailError.code === 'ESOCKET' || emailError.code === 'ECONNECTION') {
          errorMessage = 'Error de conexión con el servidor de correo.';
        } else if (emailError.code === 'EENVELOPE') {
          errorMessage = 'La dirección de correo destino no es válida.';
        }

        res.status(500).json({
          message: errorMessage,
          emailError,
        });
      }

    } else {
      res.json({ status: 'false', message: `El correo del ${user_name} , no fue encontrado.` })
    }
  } catch (error:any) {
    res.status(500).json({
      message: "Error en el servidor, por favor comuniquese con soporte",
      error: error.message,
    })
  }
}
//Validar código
export const postCodeValidate = async (req: Request, res: Response) => {
  try {
      const {codigo} = req.body;
      const estado = false;
      const result: any = await codigosModel.findOne({ where: { [Op.and]: [{ estado_codigo: estado }, { codigo }] } });

      if (result) {
          const estado = {
              estado_codigo: true
          };

          await result.update(estado);

          res.json({ status: 'true', message: 'El código se ha comfirmado con éxito.' })
      } else {
          res.json({ status: 'false', message: 'Este código ya no es valido o no existe.' })
      }
  } catch (error) {
      res.status(500).json({
        message: 'Error generado en la validación del codigo.'});
  }
}


