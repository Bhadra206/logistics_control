const express = require("express");
const router = express.Router();
const orderController = require("../controllers/staffControllers");

router.get("/orders", orderController.getOrdersByDate);
router.post("/orders", orderController.createOrder);
router.put("/orders/:id", orderController.updateOrder);
router.delete("/orders/:id", orderController.deleteOrder);

module.exports = router;
