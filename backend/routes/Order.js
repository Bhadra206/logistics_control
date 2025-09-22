const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderControllers");

router.get("/orders", orderController.getOrders);
router.post("/orders", orderController.createOrder);
router.put("/:id", orderController.replaceOrder);
router.patch("/:id", orderController.updateOrderPartial);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
