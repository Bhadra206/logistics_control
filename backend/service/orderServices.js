const Order = require("../schema/orderSchema");
const Driver = require("../schema/driverSchema");
const Vehicle = require("../schema/vehicleSchema");
const mongoose = require("mongoose");

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

  const exceptionFields = [
    "customerName",
    "customerEmail",
    "customerMobile",
    "placeOfCustomer",
  ];

  // Exclude driver/vehicle from this check
  const fieldsToCheck = Object.keys(updateData).filter(
    (field) => !["driver", "vehicle"].includes(field)
  );

  // Trigger reset if any non-exception field is updated
  const shouldTrigger = fieldsToCheck.some(
    (field) => !exceptionFields.includes(field)
  );

  const update = { $set: {}, $unset: {} };
  Object.assign(update.$set, updateData);

  if (shouldTrigger) {
    update.$set.status = "Pending";
    update.$set.TotalCost = 0; // reset cost
    update.$unset.driver = ""; // clear previous assignment
    update.$unset.vehicle = "";
    // Remove driver/vehicle from $set if they came from PUT body
    delete update.$set.driver;
    delete update.$set.vehicle;
  }

  // Only assign driver if explicitly intended (separate endpoint or explicit field)
  if (updateData.driver) {
    const driverExists = await Driver.findById(updateData.driver);
    if (!driverExists) return { success: false, message: "Driver not found" };
    update.$set.driver = driverExists._id;
  }

  if (updateData.vehicle) {
    const vehicleExists = await Vehicle.findById(updateData.vehicle);
    if (!vehicleExists) return { success: false, message: "Vehicle not found" };
    update.$set.vehicle = vehicleExists._id;
  }

  // Set status = Allocated only if both are assigned in this update
  if (update.$set.driver && update.$set.vehicle) {
    update.$set.status = "Allocated";
    delete update.$unset.driver;
    delete update.$unset.vehicle;
  }

  const updatedOrder = await Order.findByIdAndUpdate(id, update, {
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
