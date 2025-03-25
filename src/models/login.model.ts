import { DataTypes } from "sequelize";
import { sequelize } from "../db/connection";


export const loginModel = sequelize.define(
  'login',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    user_password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    estado_login: {
      type: DataTypes.BOOLEAN,
    },
    fha_created: {
      type: DataTypes.DATE,
    }
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  },
)
