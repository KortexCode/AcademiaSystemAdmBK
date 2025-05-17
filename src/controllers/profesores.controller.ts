import { Response, Request } from "express";
import { profesorModel } from "../models/profesor.model";


export const getProfesores = async (req: Request, res: Response) => {
  try {
    const profesores = await profesorModel.findAll({include:"persona"});
    if(profesores){
      res.status(200).json({
        message: "Búsqueda de profesores exitosa",
        data: profesores,
      });
    }else {
      res.status(404).json({
        message:"No se encontró registro de profesores"
      })
    }
  } catch (error) {
    res.status(500).json({
        message:"Error en el servidor por favor comunicarse con soporte"
      })
  }
};

export const getProfesor = async (req: Request, res: Response) => {
  const id: any = req.params;
  try {
    const profesor = await profesorModel.findByPk(id, {
      include: 'persona',
    });

    if (profesor) {
      res.status(200).json(profesor);
    } else {
      res.status(400).json({
        status: false,
        message: `el profesor con id:${id} no fue encontrado`,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error en el servidor al realizar la consulta",
      error: error,
    })
  }
};
