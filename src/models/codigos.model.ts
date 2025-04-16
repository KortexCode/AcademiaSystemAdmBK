import { DataTypes } from 'sequelize';
import { sequelize } from "../db/connection";

export const codigosModel = sequelize.define('codigos_password', {
  id_codigo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estado_codigo: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  fha_genera: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  freezeTableName: true,
  createdAt: false,
  updatedAt: false,
});







