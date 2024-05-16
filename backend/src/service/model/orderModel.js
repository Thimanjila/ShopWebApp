const Order = require("../db/orderSchema");
const OrderHasStock = require("../db/orderStockSchema");
const Stock = require("../db/stockSchema");

async function createOrder(data) {
  const order = data.orderDetails;
  const orderStock = data.orderStock;

  const newOrder = await Order.create(order);
  const orderId = newOrder.id;

  orderStock.forEach((stock) => {
    stock.orderId = orderId;
  });

  await OrderHasStock.bulkCreate(orderStock);

  orderStock.forEach(async (stock) => {
    const stockData = await Stock.findByPk(stock.stockId);
    const newStock = {
      quantity: stockData.quantity - stock.quantity,
    };
    await Stock.update(newStock, { where: { id: stock.stockId } });
  });

  return newOrder;
}

async function getOrders() {
  return Order.findAll();
}

async function getOrderById(id) {
  return Order.findByPk(id);
}

async function updateOrder(id, data) {
  const order = data.orderDetails;
  const orderStock = data.orderStock;

  await Order.update(order, { where: { id } });
  forEach(orderStock, async (stock) => {
    await OrderHasStock.update(stock, { where: { id: stock.id } });
  });
}

async function deleteOrder(id) {
  OrderHasStock.destroy({ where: { orderId: id } });
  return Order.destroy({ where: { id } });
}

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
