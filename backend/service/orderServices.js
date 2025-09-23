const Order = require("../schema/orderSchema");
const Driver = require("../schema/driverSchema");
const Vehicle = require("../schema/vehicleSchema");

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

// Create Order
const createOrder = async (orderData) => {
  const order = new Order(orderData);
  console.log("Order saved successfully");
  return await order.save();
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

  if (updateData.driver) {
    const driverExists = await Driver.findById(updateData.driver);
    if (!driverExists) throw new Error("Driver not found");
    update.$set.driver = driverExists._id;
  }

  if (updateData.vehicle) {
    const vehicleExists = await Vehicle.findById(updateData.vehicle);
    if (!vehicleExists) throw new Error("Vehicle not found");
    update.$set.vehicle = vehicleExists._id;
  }

  if (update.$set.driver && update.$set.vehicle) {
    update.$set.status = "Allocated";
    delete update.$unset.driver;
    delete update.$unset.vehicle;
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

module.exports = {
  getOrders,
  createOrder,
  replaceOrder,
  updateOrderPartial,
  deleteOrder,
};
