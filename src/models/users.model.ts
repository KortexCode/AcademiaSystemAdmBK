
import { sequelize } from "../db/connection";
import { DataTypes } from "sequelize";


export const usersModel = sequelize.define('usuarios', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombres: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    numero_documento: {
        type: DataTypes.STRING(12),
        allowNull: false,
        unique: true
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    sexo: {
        type: DataTypes.ENUM('Masculino', 'Femenino'),
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    celular: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    permiso: {
        type: DataTypes.ENUM('Administrador', 'Encargado'),
        allowNull: false
    },
    fha_registro: {
        type: DataTypes.DATE,
        allowNull: false
    }
},  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  },);

