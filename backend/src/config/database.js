const { Sequelize } = require("sequelize");
require("dotenv").config();
const DB = process.env.DB;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const HOST = process.env.HOST;
const DB_PORT = process.env.DB_PORT;
const DB_DIALECT = process.env.DB_DIALECT;

const sequelize = new Sequelize(DB, DB_USER, DB_PASSWORD, {
  host: HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to MySQL has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
