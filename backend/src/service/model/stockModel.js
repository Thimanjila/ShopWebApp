const Stock = require("../db/stockSchema");

async function createStock(stock) {
  return Stock.create(stock);
}

async function getStocks() {
  return Stock.findAll();
}

async function updateStock(id, stock) {
  return Stock.update(stock, { where: { id } });
}

async function deleteStock(id) {
  return Stock.destroy({ where: { id } });
}

async function findByStockName(name) {
  return Stock.findOne({ where: { name } });
}

module.exports = {
  createStock,
  getStocks,
  updateStock,
  deleteStock,
  findByStockName,
};
