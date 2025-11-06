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
          totalCost: 1,
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
        totalCost: 1,
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
    if (!order) throw new Error("Order not found");

    // Use correct IDs (handle both driver / vehicle)
    const driverId = orderData.driver || orderData.driverId;
    const vehicleId = orderData.vehicle || orderData.vehicleId;

    const startDate = orderData.startDate || order.startDate;
    const endDate = orderData.endDate || order.endDate;
    const typeOfService = orderData.typeOfService || order.typeOfService;

    const newStart = new Date(startDate);
    const newEnd = new Date(endDate);

    // ========================
    // ✅ DRIVER VALIDATION
    // ========================
    if (driverId) {
      const driver = await Driver.findById(driverId);
      if (!driver) throw new Error("Driver not found");

      // Check overlap with other saved orders (date conflict)
      const existingDriverConflict = await Order.findOne({
        _id: { $ne: id },
        driver: driverId,
        status: { $in: ["Allocated", "In Progress"] },
        startDate: { $lte: newEnd },
        endDate: { $gte: newStart },
      });

      if (existingDriverConflict) {
        throw new Error(
          `Driver ${driver.name} already assigned between ${new Date(
            existingDriverConflict.startDate
          ).toLocaleDateString()} and ${new Date(
            existingDriverConflict.endDate
          ).toLocaleDateString()}`
        );
      }

      // Licence check
      if (typeOfService === "goods" && driver.licence !== "HMV") {
        throw new Error("Only HMV licensed drivers can handle goods orders");
      }

      if (
        typeOfService === "passenger" &&
        !["LMV", "HMV"].includes(driver.licence)
      ) {
        throw new Error(
          "Only LMV or HMV licensed drivers can handle passenger orders"
        );
      }

      if (typeOfService === "both" && driver.licence !== "HMV") {
        throw new Error(
          "Only HMV licensed drivers can handle both-type orders"
        );
      }
    }

    // ========================
    // ✅ VEHICLE VALIDATION
    // ========================
    if (vehicleId) {
      const vehicle = await Vehicle.findById(vehicleId);
      if (!vehicle) throw new Error("Vehicle not found");

      // Check overlap with other saved orders (date conflict)
      const existingVehicleConflict = await Order.findOne({
        _id: { $ne: id },
        vehicle: vehicleId,
        status: { $in: ["Allocated", "In Progress"] },
        startDate: { $lte: newEnd },
        endDate: { $gte: newStart },
      });

      if (existingVehicleConflict) {
        throw new Error(
          `Vehicle ${vehicle.name} already assigned between ${new Date(
            existingVehicleConflict.startDate
          ).toLocaleDateString()} and ${new Date(
            existingVehicleConflict.endDate
          ).toLocaleDateString()}`
        );
      }

      // Vehicle type validation
      if (typeOfService === "goods" && vehicle.type !== "HMV") {
        throw new Error("Only HMV vehicles can be used for goods orders");
      }

      if (typeOfService === "passenger" && vehicle.type !== "LMV") {
        throw new Error("Only LMV vehicles can be used for passenger orders");
      }

      if (typeOfService === "both" && vehicle.type !== "HMV") {
        throw new Error("Only HMV vehicles can be used for both-type orders");
      }
    }

    // ✅ Update order if everything passes
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        ...orderData,
        driver: driverId,
        vehicle: vehicleId,
      },
      { new: true }
    ).populate("driver vehicle");

    return updatedOrder;
  } catch (err) {
    console.error("Replace order error:", err.message);
    throw err;
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

  // ✅ Detect which fields actually changed
  const changedFields = Object.keys(updateData).filter((key) => {
    const oldVal = order[key];
    const newVal = updateData[key];
    return JSON.stringify(oldVal) !== JSON.stringify(newVal);
  });

  const isOnlyCustomerUpdate =
    changedFields.length > 0 &&
    changedFields.every((key) => customerFields.includes(key));

  const affectsAllocation = changedFields.some((key) =>
    allocationAffectingFields.includes(key)
  );

  const update = { $set: updateData };

  // 🔹 If allocation-impacting fields changed, unset driver/vehicle/costs
  if (affectsAllocation && !isOnlyCustomerUpdate) {
    // Avoid Mongo conflict by removing fields from $set before unsetting
    if (update.$set) {
      delete update.$set.driver;
      delete update.$set.vehicle;
      delete update.$set.totalCost;
      delete update.$set.overtimeHours;
    }

    update.$unset = {
      driver: 1,
      vehicle: 1,
      totalCost: 1,
      overtimeHours: 1,
    };
    update.$set.status = "Pending";
  } else if (!isOnlyCustomerUpdate && !update.$set.status) {
    // Default to pending if something else changes
    update.$set.status = "Pending";
  } else if (isOnlyCustomerUpdate) {
    // Keep the old status for customer-only updates
    update.$set.status = order.status;
  }

  // 🔹 Save changes
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
