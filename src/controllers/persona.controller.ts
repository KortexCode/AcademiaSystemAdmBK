import { Response, Request } from "express";
import { personaModel } from "../models/persona.model";

//Obtener todas las personas
export const getPersonas = async (req: Request, res: Response) => {
  try {
    const personas = await personaModel.findAll();
    if (personas) {
      res.status(200).json({
        message: "Búsqueda de personas exitosa",
        data: personas,
      });
    } else {
      res.status(404).json({
        message: "No se encontraron registros de personas",
      });
    }
  } catch (error) {
    res.status(500).json({
        message: "Error en el servidor por favor comunicarse con soporte",
      });
  }
};

//Obtener una persona
export const getPersona = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const persona = await personaModel.findByPk(id);
    if (persona) {
      return res.json({
        status: true,
        message: `Búsque de persona con id ${id} exitosa`,
        data: persona,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: `No se encontró a la persona con id ${id}`,
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
