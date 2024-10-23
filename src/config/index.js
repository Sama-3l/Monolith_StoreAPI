const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
    const configFile = `./.env.${process.env.NODE_ENV}`;
    dotEnv.config({ path: configFile });
} else {
    console.log("Hello");
    dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  APP_SECRET: process.env.APP_SECRET
};
