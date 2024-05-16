require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const stockRouter = require("./api/router/stock.routes");
const orderRouter = require("./api/router/order.routes");

app.use("/stocks", stockRouter);
app.use("/orders", orderRouter);

module.exports = app;
