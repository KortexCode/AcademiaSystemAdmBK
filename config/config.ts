const dotenv = require("dotenv");
dotenv.config();

interface ConfigEnv {
  port: string;
  dbHost: string;
  dbPassword: string;
  dbName: string;
  secretPassword: string;
}

const config: ConfigEnv = {
  port: process.env.PORT || "3000",
  dbHost: process.env.SQHOSTNAME || "root",
  dbPassword: process.env.SQPASSWORD || "123",
  dbName: process.env.SQBDNAME || "name",
  secretPassword: process.env.SECRETPASSWORD || "secret",
};

export { config };
