import { DataTypes } from "sequelize";
import { sequelize } from "../db/connection";

const personaModel = sequelize.define(
  "personas",
  {
    id_persona: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    identificacion: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    edad: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    sexo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seguridad_social: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    patologia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha_de_registro: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  },
);

export { personaModel };
