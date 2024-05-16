const express = require("express");
const bodyParser = require("body-parser");

const controller = require("../../service/controller/orderController");

const router = express.Router();
router.use(bodyParser.json());

router.post("/", controller.createOrderController);
router.get("/", controller.getOrdersController);
router.get("/:id", controller.getOrderByIdController);
router.put("/:id", controller.updateOrderController);
router.delete("/:id", controller.deleteOrderController);

module.exports = router;
