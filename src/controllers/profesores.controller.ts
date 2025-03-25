import { Response, Request } from "express";
import { profesorModel } from "../models/profesor.model";


export const getProfesores = async (req: Request, res: Response) => {
  try {
    console.log("ENTRANDO A CONSULTA")
    const profesores = await profesorModel.findAll({include:"persona"});
    console.log("ENTRANDO A CONSULTA", profesores)
    if(profesores){
      res.status(200).json(profesores);
    }else {
      res.status(400).json({
        status:false,
        message:"No se encontró registro de profesores"
      })
    }
  } catch (error) {
    res.status(400).json({
        status:false,
        message:"Error en el servidor al realizar la consulta"
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
