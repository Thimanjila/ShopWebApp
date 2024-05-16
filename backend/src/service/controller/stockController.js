const {
  createStock,
  getStocks,
  updateStock,
  deleteStock,
  findByStockName,
} = require("../model/stockModel");

async function create(req, res) {
  try {
    const stock = req.body;
    const newStock = await createStock(stock);
    res.status(200).json(newStock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function read(req, res) {
  try {
    const stocks = await getStocks();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const stock = req.body;
    const updatedStock = await updateStock(id, stock);
    res.status(200).json(updatedStock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    await deleteStock(id);
    res.status(200).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function findByName(req, res) {
  try {
    const { name } = req.params;
    const stock = await findByStockName(name);
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  create,
  read,
  update,
  remove,
  findByName,
};
