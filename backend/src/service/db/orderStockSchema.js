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

const OrderHasStock = sequelize.define("OrderStock", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  stockId: {
    type: DataTypes.INTEGER,
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
    console.log("Order Stock table has been created.");
  })
  .catch((err) => {
    console.error("Unable to create the table:", err);
  });

module.exports = OrderHasStock;
