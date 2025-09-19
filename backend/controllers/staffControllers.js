const Order = require("../schema/orderSchema");
const Driver = require("../schema/driverSchema");
const Vehicle = require("../schema/vehicleSchema");
const orderServices = require("../service/staffServices");

//Get Order
// const getOrdersByDate = async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;

//     const orders = await orderServices.getOrdersByDate(startDate, endDate);

//     res.status(200).json({ success: true, data: orders });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // Create Order
// const createOrder = async (req, res) => {
//   try {
//     const newOrder = await orderServices.createOrder(req.body);
//     res.status(201).json({ success: true, data: newOrder });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

// //Edit Order
// const updateOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedOrder = await orderServices.updateOrder(id, req.body);

//     res.status(200).json({ success: true, data: updatedOrder });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

// //Delete Order
// const deleteOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await orderServices.deleteOrder(id);

//     if (!result.success) {
//       return res.status(400).json({ success: false, message: result.message });
//     }

//     res.status(200).json({ success: true, message: "Order deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


module.exports = { getOrdersByDate, createOrder, updateOrder, deleteOrder };
