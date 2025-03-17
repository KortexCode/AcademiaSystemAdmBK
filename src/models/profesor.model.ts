import { DataTypes } from "sequelize";
import { sequelize } from "../db/connection";
import { personaModel } from "./persona.model";

export const profesorModel = sequelize.define(
  "profesores",
  {
    id_profesor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    profesion: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    perfil: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    disponibilidad: {
      type: DataTypes.ENUM("completo", "tarde", "mañana", "horas"),
    },
    horas_disponibles: {
      type: DataTypes.INTEGER,
    },
    estado: {
      type: DataTypes.ENUM("Activo", "Inactivo"),
    },
    id_profesor_persona: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: personaModel,
        key: "id_persona",
      },
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  },
);

// Definir la relación con la tabla personas
profesorModel.belongsTo(personaModel, {
  foreignKey: "id_profesor_persona",
  as: "persona",
});
