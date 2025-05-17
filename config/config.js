import {config} from "./configDotenv"

require('dotenv').config();

module.exports = {
  development: {
     username: config.dbHost || 'usuario_test',
    password: config.dbPassword || 'contraseña_test',
    database: config.dbName|| 'db_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'usuario_test',
    password: 'contraseña_test',
    database: 'db_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    /* storage: ':memory:', */
  },
  production: {
    username: '',
    password: '',
    database: '',
    host: '',
    dialect: '',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
      },
    },
  },
};

/* {
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
} */
