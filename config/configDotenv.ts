const dotenv = require("dotenv");
dotenv.config();

interface ConfigEnv {
  port: string;
  dbHost: string;
  dbPassword: string;
  dbName: string;
  secretPassword: string;
  email: string;
  password: string;
  emailHost: string;
}

const config: ConfigEnv = {
  port: process.env.PORT || "3000",
  dbHost: process.env.SQHOSTNAME || "root",
  dbPassword: process.env.SQPASSWORD || "123",
  dbName: process.env.SQBDNAME || "name",
  secretPassword: process.env.SECRETPASSWORD || "secret",
  email: process.env.EMAIL || "maddison53@ethereal.email",
  password: process.env.EMAILPASSWORD || "jn7jnAPss4f63QBp6D",
  emailHost: process.env.EMAILHOST || "smtp.ethereal.email",
};

export { config };
