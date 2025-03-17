import { Response, Request } from "express";
import { personaModel } from "../models/persona.model";
import { json } from "sequelize";
import { aprendizModel } from "../models/aprendizModel";

//Obtener todos los aprendices
export const getAprendices = async (req: Request, res: Response) => {
  try {
    const aprendices = await aprendizModel.findAll({
      include: "persona",
    });
    if (aprendices) {
      res.json({
        status: true,
        message: "Búsqueda de aprendices exitosa",
        data: aprendices,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

//Obtener un Aprendiz
export const getAprendiz = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const aprendiz = await personaModel.findByPk(id, {
      include: "persona",
    });
    if (aprendiz) {
      return res.json({
        status: true,
        message: `El aprendiz ${aprendiz}`,
      });
    } else {
      return res.status(404).json({
        msg: `Product not found with ${id}`,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

//Crear un producto
const postPersona = async (req: Request, res: Response) => {
  const {
    name: product_name,
    description: product_description,
    price,
    stock,
  } = req.body;
  try {
    await personaModel.create({
      product_name,
      product_description,
      price,
      stock,
    });
    res.json({
      msg: "product created",
      products: req.body,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      msg: "An error has ocurred, comunicate with support",
      error,
    });
  }
};
//Actualizar un producto
const putPersona = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const product = await personaModel.findByPk(id);
    if (!product) {
      return res.status(404).json({
        msg: `Product with id ${id} not found`,
      });
    } else {
      const {
        name: product_name,
        description: product_description,
        price,
        stock,
      } = req.body;

      await product.update({ product_name, product_description, price, stock });
      res.json({
        msg: "Product was updated succesfully",
        id,
        product: body,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({
      mgs: "An error has ocurred, comunicate with support",
      error,
    });
  }
};
