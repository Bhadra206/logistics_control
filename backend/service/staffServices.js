const Order = require("../schema/orderSchema");

// //Get Order
// const getOrdersByDate = async (startDate, endDate) => {
//   const query = {};

//   if (startDate && endDate) {
//     query.startDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
//   }

//   return await Order.find(query).populate("driver vehicle");
// };

// // Create Order
// const createOrder = async (orderData) => {
//   const order = new Order(orderData);
//   return await order.save();
// };

// //Edit Order
// const updateOrder = async (id, orderData) => {
//   return await Order.findByIdAndUpdate(id, orderData, { new: true });
// };

// //Delete Order
// const deleteOrder = async (id) => {
//   const order = await Order.findById(id);
//   if (!order) {
//     return { success: false, message: "Order not found" };
//   }

//   // Check status before deleting
//   if (["Allocated", "Completed"].includes(order.status)) {
//     return {
//       success: false,
//       message: `Cannot delete an ${order.status} order`,
//     };
//   }

//   await Order.findByIdAndDelete(id);
//   return { success: true };
// };

module.exports = { getOrdersByDate, createOrder, updateOrder, deleteOrder };
