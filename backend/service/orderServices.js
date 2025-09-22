const Order = require("../schema/orderSchema");

//Get Order
const getOrders = async (startDate) => {
  try {
    let date = startDate ? new Date(startDate) : new Date();

    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    // const orders = await Order.find({
    //   startDate: { $gte: startOfDay, $lte: endOfDay },
    // });
    // console.log("Orders found:", orders);

    const orders = await Order.aggregate([
      {
        $match: { startDate: { $gte: startOfDay, $lte: endOfDay } },
      },
      {
        $lookup: {
          from: "vehicles",
          localField: "vehicle",
          foreignField: "_id",
          as: "vehicle",
        },
      },
      { $unwind: "$vehicle" },
      {
        $lookup: {
          from: "drivers",
          localField: "driver",
          foreignField: "_id",
          as: "driver",
        },
      },
      { $unwind: "$driver" },
      {
        $project: {
          customerName: 1,
          customerMobile: 1,
          startLoc: 1,
          dropLoc: 1,
          startDate: 1,
          endDate: 1,
          "vehicle.name": 1,
          "driver.name": 1,
          numberOfDays: 1,
          typeOfService: 1,
          numPassengers: 1,
          distance: 1,
          TotalCost: 1,
          overtimeHours: 1,
          status: 1,
        },
      },
    ]);

    return orders;
  } catch (err) {
    console.error("Error fetching orders:", err);
    throw err;
  }
};

// Create Order
const createOrder = async (orderData) => {
  const order = new Order(orderData);
  console.log("Order saved successfully");
  return await order.save();
};

//Edit Order
const updateOrder = async (id, updateData) => {
  const order = await Order.findById(id);
  if (!order) return { success: false, message: "Order not found" };

  const exceptionFields = ["status", "remarks", "driver", "vehicle"];
  const updatedFields = Object.keys(updateData);

  const shouldTrigger = updatedFields.some(
    (field) => !exceptionFields.includes(field)
  );

  if (shouldTrigger) {
    updateData.status = "Pending";
    updateData.driver = undefined;
    updateData.vehicle = undefined;
  }

  if (updateData.driver) {
    const driverExists = await Driver.findById(updateData.driver);
    if (!driverExists) return { success: false, message: "Driver not found" };
    updateData.driver = driverExists._id;
  }

  if (updateData.vehicle) {
    const vehicleExists = await Vehicle.findById(updateData.vehicle);
    if (!vehicleExists) return { success: false, message: "Vehicle not found" };
    updateData.vehicle = vehicleExists._id;
  }

  if (updateData.driver && updateData.vehicle) {
    updateData.status = "Allocated";
  }

  const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
    new: true,
  }).populate("driver vehicle");

  return { success: true, data: updatedOrder };
};

//Delete Order
const deleteOrder = async (id) => {
  try {
    const order = await Order.findOneAndDelete({
      _id: id,
      status: { $ne: ["Completed", "In Progress"] },
    });

    if (!order) {
      return {
        success: false,
        message: "Order not found or already completed",
      };
    }

    return { success: true, message: "Order deleted successfully" };
  } catch (err) {
    console.error("Error deleting order:", err);
    throw err;
  }
};

module.exports = { getOrders, createOrder, updateOrder, deleteOrder };
