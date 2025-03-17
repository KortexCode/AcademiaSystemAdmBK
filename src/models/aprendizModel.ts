import { DataTypes } from "sequelize";
import { sequelize } from "../db/connection";
import { personaModel } from "./persona.model";

export const aprendizModel = sequelize.define(
  "aprendiz",
  {
    id_aprendiz: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    acudiente: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "no aplica",
    },
    telefono_acudiente: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "no aplica",
    },
    telefono_alt_acudiente: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "no aplica",
    },
    ocupacion: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("Activo", "Inactivo"),
    },
    id_aprendiz_persona: {
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
aprendizModel.belongsTo(personaModel, {
  foreignKey: "id_aprendiz_persona",
  as: "persona",
});
