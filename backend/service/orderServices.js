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

//Get All Orders
const getAllOrders = async () => {
  const orders = await Order.find();
  return orders;
};

//Get Order by id or name
const getOrderByIdOrName = async ({ name, id }) => {
  const query = {};

  if (name || id) {
    query.$or = [];
    if (name) query.$or.push({ customerName: { $regex: name, $options: "i" } });
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      query.$or.push({ _id: new mongoose.Types.ObjectId(id) });
    }
  }

  const orders = await Order.find(query);
  return orders;
};

// Create Order
const createOrder = async (orderData) => {
  try {
    // Calculate number of days (difference in ms / ms per day)
    const start = new Date(orderData.startDate);
    const end = new Date(orderData.endDate);

    if (isNaN(start) || isNaN(end)) {
      throw new Error("Invalid startDate or endDate");
    }

    let daysOfService = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1
    );
    if (daysOfService <= 0) daysOfService = 1;

    orderData.numberOfDays = daysOfService;

    const order = new Order(orderData);
    const savedOrder = await order.save();

    console.log("Order saved successfully");
    return savedOrder;
  } catch (err) {
    console.error("Error creating order:", err);
    throw err;
  }
};

// Edit full Document
const replaceOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("driver vehicle");

    res.json({ success: true, data: updatedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//Edit specific field
const updateOrderPartial = async (id, updateData) => {
  const order = await Order.findById(id);
  if (!order) throw new Error("Order not found");

  const exceptionFields = [
    "customerName",
    "customerEmail",
    "customerMobile",
    "placeOfCustomer",
  ];
  const fieldsToCheck = Object.keys(updateData).filter(
    (f) => !["driver", "vehicle"].includes(f)
  );
  const shouldTrigger = fieldsToCheck.some((f) => !exceptionFields.includes(f));

  const update = { $set: {}, $unset: {} };
  Object.assign(update.$set, updateData);

  if (shouldTrigger) {
    update.$set.status = "Pending";
    update.$set.TotalCost = 0;
    update.$unset.driver = "";
    update.$unset.vehicle = "";
    delete update.$set.driver;
    delete update.$set.vehicle;
  }

  let driverExists, vehicleExists;

  if (updateData.driver) {
    driverExists = await Driver.findById(updateData.driver);
    if (!driverExists) throw new Error("Driver not found");
    update.$set.driver = driverExists._id;
  }

  if (updateData.vehicle) {
    vehicleExists = await Vehicle.findById(updateData.vehicle);
    if (!vehicleExists) throw new Error("Vehicle not found");
    update.$set.vehicle = vehicleExists._id;
  }

  // Total cost calculation
  if (update.$set.driver && update.$set.vehicle) {
    update.$set.status = "Allocated";
    delete update.$unset.driver;
    delete update.$unset.vehicle;

    const distance = order.distance || 0; // assuming `distance` is stored in order
    const startDate = new Date(order.startDate);
    const dropDate = new Date(order.endDate);

    // Number of service days
    const daysOfService = order.numberOfDays || 0;

    // Overtime hours calculation
    let overtimeHours = Math.ceil((distance - daysOfService * 400) / 50);
    if (overtimeHours < 0) overtimeHours = 0;

    // Vehicle cost
    const perKmRate = vehicleExists?.ratePerKm || 0;
    const vehicleCost = distance * perKmRate;

    // Driver cost
    const perDayRate = driverExists?.perDayRate || 0;
    const overtimeRate = driverExists?.overTimeRate || 0;
    const driverCost =
      daysOfService * perDayRate + overtimeHours * overtimeRate;

    const totalCost = vehicleCost + driverCost;

    update.$set.daysOfService = daysOfService;
    update.$set.overtimeHours = overtimeHours;
    update.$set.vehicleCost = vehicleCost;
    update.$set.driverCost = driverCost;
    update.$set.TotalCost = totalCost;
  }

  const updatedOrder = await Order.findByIdAndUpdate(id, update, {
    new: true,
  }).populate("driver vehicle");

  return updatedOrder;
};

//Delete Order
const deleteOrder = async (id) => {
  try {
    const order = await Order.findOneAndDelete({
      _id: id,
      status: { $nin: ["Completed", "In Progress"] },
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

module.exports = {
  getOrders,
  getAllOrders,
  getOrderByIdOrName,
  createOrder,
  replaceOrder,
  updateOrderPartial,
  deleteOrder,
};
