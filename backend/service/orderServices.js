const Order = require("../schema/orderSchema");
const Driver = require("../schema/driverSchema");
const Vehicle = require("../schema/vehicleSchema");
const mongoose = require("mongoose");

//Get Order
const getOrders = async (startDate) => {
  try {
    let matchStage = {};

    if (startDate) {
      const date = new Date(startDate);
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));
      matchStage = { startDate: { $gte: startOfDay, $lte: endOfDay } };
    }

    const orders = await Order.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: "vehicles",
          localField: "vehicle",
          foreignField: "_id",
          as: "vehicle",
        },
      },
      { $unwind: { path: "$vehicle", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "drivers",
          localField: "driver",
          foreignField: "_id",
          as: "driver",
        },
      },
      { $unwind: { path: "$driver", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          customerName: 1,
          customerMobile: 1,
          customerEmail: 1,
          placeOfCustomer: 1,
          startLoc: 1,
          dropLoc: 1,
          startDate: 1,
          endDate: 1,
          "vehicle.name": 1,
          "driver.name": 1,
          numberOfDays: 1,
          typeOfService: 1,
          numPassengers: 1,
          weight: 1,
          distance: 1,
          TotalCost: 1,
          overtimeHours: 1,
          status: 1,
        },
      },
      { $sort: { startDate: -1 } },
    ]);

    return orders;
  } catch (err) {
    console.error("Error fetching orders:", err);
    throw err;
  }
};

//Get All Orders
const getAllOrders = async () => {
  const orders = await Order.aggregate([
    {
      $lookup: {
        from: "vehicles",
        localField: "vehicle",
        foreignField: "_id",
        as: "vehicle",
      },
    },
    { $unwind: { path: "$vehicle", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "drivers",
        localField: "driver",
        foreignField: "_id",
        as: "driver",
      },
    },
    { $unwind: { path: "$driver", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        customerName: 1,
        customerMobile: 1,
        customerEmail: 1,
        placeOfCustomer: 1,
        startLoc: 1,
        dropLoc: 1,
        startDate: 1,
        endDate: 1,
        "vehicle.name": 1,
        "driver.name": 1,
        numberOfDays: 1,
        typeOfService: 1,
        numPassengers: 1,
        weight: 1,
        distance: 1,
        TotalCost: 1,
        overtimeHours: 1,
        status: 1,
      },
    },
    { $sort: { startDate: -1 } },
  ]);

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
const replaceOrder = async (id, orderData) => {
  try {
    const order = await Order.findById(id);
    if (!order) if (!order) throw new Error("Order not found");

    const updatedOrder = await Order.findByIdAndUpdate(id, orderData, {
      new: true,
    });

    return updatedOrder;
  } catch (err) {
    console.error(err);
  }
};

//Edit specific field
const updateOrderPartial = async (id, updateData) => {
  const order = await Order.findById(id);
  if (!order) throw new Error("Order not found");

  const customerFields = [
    "customerName",
    "customerEmail",
    "customerMobile",
    "placeOfCustomer",
  ];

  const allocationAffectingFields = [
    "startDate",
    "endDate",
    "dropLoc",
    "numberOfDays",
    "numPassengers",
    "weight",
    "typeOfService",
    "distance",
  ];

  const isOnlyCustomerUpdate = Object.keys(updateData).every((key) =>
    customerFields.includes(key)
  );

  const affectsAllocation = Object.keys(updateData).some((key) =>
    allocationAffectingFields.includes(key)
  );

  const update = { $set: updateData };

  // 🔹 If allocation-affecting fields changed, unset driver/vehicle
  if (affectsAllocation && !isOnlyCustomerUpdate) {
    update.$unset = { driver: 1, vehicle: 1 };
    update.$set.status = "Pending"; // reset to pending when allocation changes
  }

  // 🔹 Always include total cost & status recalculation
  const driver = await Driver.findById(updateData.driver || order.driver);
  const vehicle = await Vehicle.findById(updateData.vehicle || order.vehicle);

  if (driver && vehicle) {
    const distance = updateData.distance ?? order.distance ?? 0;
    const daysOfService = updateData.numberOfDays ?? order.numberOfDays ?? 0;

    let overtimeHours = Math.ceil((distance - daysOfService * 400) / 50);
    if (overtimeHours < 0) overtimeHours = 0;

    const vehicleCost = distance * (vehicle.ratePerKm || 0);
    let driverCost = daysOfService * (driver.perDayRate || 0);

    if (overtimeHours > 0)
      driverCost += overtimeHours * (driver.overTimeRate || 0);

    const totalCost = vehicleCost + driverCost;

    // ✅ If both driver and vehicle exist, mark as Allocated
    Object.assign(update.$set, {
      overtimeHours,
      vehicleCost,
      driverCost,
      totalCost,
      status: "Allocated",
    });
  } else if (!isOnlyCustomerUpdate && !update.$set.status) {
    // If driver/vehicle missing and not just a customer edit
    update.$set.status = "Pending";
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
