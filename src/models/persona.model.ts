import { DataTypes } from "sequelize";
import { sequelize } from "../db/connection";

const personaModel = sequelize.define(
  "personas",
  {
    // Model attributes are defined here
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
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
    },
    sexo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seguridad_social: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patologia: {
      type: DataTypes.STRING,
      allowNull: false,
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
