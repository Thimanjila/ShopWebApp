const { Sequelize, DataTypes } = require("sequelize");
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

const Stock = sequelize.define("Stock", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  stockPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  retailPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Stock table has been created.");
  })
  .catch((err) => {
    console.error("Unable to create the table:", err);
  });

module.exports = Stock;
