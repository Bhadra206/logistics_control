const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderControllers");

router.get("/getOrder", orderController.getOrders);
router.get("/getAllOrders", orderController.getAllOrders);
router.get("/getOrderByIdOrName", orderController.getOrderByIdOrName);
router.post("/createOrder", orderController.createOrder);
router.put("/replaceOrder/:id", orderController.replaceOrder);
router.patch("/updateOrderPartial/:id", orderController.updateOrderPartial);
router.delete("/deleteOrder/:id", orderController.deleteOrder);

module.exports = router;
