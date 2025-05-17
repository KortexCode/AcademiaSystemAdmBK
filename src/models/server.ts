//Paquetes de otros módulos necesarios para la clase server
const express = require("express");
import cors from "cors";
import { Application } from "express";
import { sequelize } from "../db/connection";
import { routerApi } from "../routes";
import { config } from "../../config/configDotenv";
import { personaModel } from "./persona.model";
import { aprendizModel } from "./aprendizModel";
import { profesorModel } from "./profesor.model";
import { loginModel } from "./login.model";
import { usersModel } from "./users.model";
import { codigosModel } from "./codigos.model";

//Creación de la clase server
export default class Server {
  //propiedad que poseerá todas las configuraciones de la librearía de express
  private app: Application;
  //Propiedad que guarda el puerto por donde se comunica el servidor
  private port: string;
  //Se inicializan las propiedades y se inician los métodos que manejan las funciones del servidor
  constructor() {
    this.app = express();
    //Configuramos variable de entorno para le puerto
    this.port = config.port;
    this.listen();
    this.middleware();
    this.routes();
    this.dbConnection();
  }
  //Métodos
  //Maneja las acciones intermedias entre las peticiones http
  middleware() {
    this.app.use(express.json());
    this.app.use(cors());
  }
  //maneja las rutas según la petición http
  routes() {
    //Función donde estará la lógica de la rutas
    routerApi(this.app);
  }
  //Método que muestra por consola por cual puerto escucha el servidor
  listen() {
    this.app.listen(this.port, () => {
      console.log("Escuchando por el puerto", this.port);
    });
  }
  //Método que se encarga de comprobar la conexión con la base de datos y sincronizar modelos de la BD
  async dbConnection() {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
    await personaModel.sync();
    await aprendizModel.sync();
    await profesorModel.sync();
    await loginModel.sync();
    await usersModel.sync();
    await codigosModel.sync();
  }
}
