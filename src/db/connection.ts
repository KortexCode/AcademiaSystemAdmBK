import postgres from "postgres";
import { Sequelize } from "sequelize";
import { config } from "../../config/config";

const dbPassword = encodeURIComponent(config.dbPassword);
const sequelize = new Sequelize(config.dbName, config.dbHost, dbPassword, {
  host: "localhost",
  dialect: "postgres",
});

export { sequelize };
