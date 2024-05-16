const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../model/orderModel");

async function createOrderController(req, res) {
  try {
    const data = req.body;
    const order = await createOrder(data);
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

async function getOrdersController(req, res) {
  try {
    const orders = await getOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getOrderByIdController(req, res) {
  try {
    const id = req.params.id;
    const order = await getOrderById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateOrderController(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;
    await updateOrder(id, data);
    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteOrderController(req, res) {
  try {
    const id = req.params.id;
    await deleteOrder(id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createOrderController,
  getOrdersController,
  getOrderByIdController,
  updateOrderController,
  deleteOrderController,
};
