const orderServices = require("../service/orderServices");
const { eventLogger } = require("./logger");

//Get Order
const getOrders = async (req, res) => {
  try {
    const { startDate } = req.query;

    const orders = await orderServices.getOrders(startDate);
    eventLogger.info("Orders retrieved Successfully");
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    eventLogger.error("Error retrieving orders");
    res.status(500).json({ success: false, message: err.message });
  }
};

//Get all Order
const getAllOrders = async (req, res) => {
  try {
    const order = await orderServices.getAllOrders();
    eventLogger.info("All Orders retrieved Successfully");
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    eventLogger.error("Error fetching all Order");
    res.status(400).json({ success: false, message: err.message });
  }
};

//Get Order by id or name
const getOrderByIdOrName = async (req, res) => {
  try {
    const { id, name } = req.query;
    const order = await orderServices.getOrderByIdOrName({ id, name });
    eventLogger.info("Successfully retrieved Orders by name or id ");
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    eventLogger.error("Failed to retrieved Orders by name or id ");
    res.status(400).json({ success: false, message: err.message });
  }
};

// Create Order
const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = await orderServices.createOrder(orderData);
    eventLogger.info("Order created Successfully");
    res.status(201).json({ success: true, data: newOrder });
  } catch (err) {
    eventLogger.error("Error creating Order");
    res.status(400).json({ success: false, message: err.message });
  }
};

//Edit Order
const replaceOrder = async (req, res) => {
  try {
    const { id } = req.params;
    orderData = req.body;
    const updatedOrder = await orderServices.replaceOrder(id, orderData);
    eventLogger.info("Order has been fully updated");
    res.status(200).json({ success: true, data: updatedOrder });
  } catch (err) {
    eventLogger.error("Error updating the full order");
    res.status(400).json({ success: false, message: err.message });
  }
};

// Edit partial Order
const updateOrderPartial = async (req, res) => {
  try {
    const { id } = req.params;
    const orderData = req.body;
    console.log(req.body);
    const updatedOrder = await orderServices.updateOrderPartial(id, orderData);
    eventLogger.info("Specific field of Order has been updated successfully");
    res.status(200).json({ success: true, data: updatedOrder });
  } catch (err) {
    eventLogger.error("Error updating the partial order");
    console.error("Error in updateOrderPartial:", err);
    res.status(400).json({ error: err.message, stack: err.stack });
  }
};

//Delete Order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await orderServices.deleteOrder(id);

    if (!result.success) {
      return res.status(400).json({ success: false, message: result.message });
    }
    eventLogger.info("Order deleted successfully");
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    eventLogger.error("Error deleting order");
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getOrders,
  getAllOrders,
  getOrderByIdOrName,
  createOrder,
  replaceOrder,
  updateOrderPartial,
  deleteOrder,
};
