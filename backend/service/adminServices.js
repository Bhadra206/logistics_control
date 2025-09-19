const Driver = require("../schema/driverSchema");
const Vehicle = require("../schema/vehicleSchema");
const Order = require("../schema/orderSchema");
const Staff = require("../schema/staffSchema");

//Admin DashBoard
const getDashBoardStats = async () => {
  try {
    const activeDrivers = await Driver.countDocuments({ status: "Active" });
    const activeVehicle = await Vehicle.countDocuments({ status: "Active" });
    const allocatedOrder = await Order.countDocuments({ status: "Allocated" });
    const pendingOrder = await Order.countDocuments({ status: "Pending" });

    return { activeDrivers, activeVehicle, allocatedOrder, pendingOrder };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//Vehicle
const getVehicles = async (status) => {
  try {
    let filter = {};
    if (status) {
      filter.status = status;
    }
    const inactiveVehicles = await Vehicle.countDocuments({
      status: "Inactive",
    });
    const activeVehicles = await Vehicle.countDocuments({ status: "Active" });
    const totalVehicles = await Vehicle.countDocuments();
    const vehicles = await Vehicle.find(filter);
    return { inactiveVehicles, activeVehicles, totalVehicles, vehicles };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const addVehicle = async (newVehicle) => {
  try {
    await newVehicle.save();
    console.log("Vehicle added Successfully");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//Driver
const getDrivers = async (status) => {
  try {
    let filter = {};
    if (status) {
      filter.status = status;
    }
    const inactivedrivers = await Driver.countDocuments({
      status: "Inactive",
    });
    const activeDrivers = await Driver.countDocuments({ status: "Active" });
    const totalDrivers = await Driver.countDocuments();
    const drivers = await Driver.find(filter);
    return { inactivedrivers, activeDrivers, totalDrivers, drivers };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const addDriver = async (newDriver) => {
  try {
    await newDriver.save();
    console.log("Driver added Successfully");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//Staff
const addStaff = async (newStaff) => {
  try {
    await newStaff.save();
    console.log("Staff added Successfully");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  getDashBoardStats,
  addVehicle,
  addDriver,
  getVehicles,
  getDrivers,
  addStaff,
};
