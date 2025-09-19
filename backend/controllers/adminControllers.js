const adminServices = require("../service/adminServices");
const { eventLogger } = require("./logger.js");

//Admin DashBoard
const getDashBoardStats = async (req, res) => {
  try {
    const stats = await adminServices.getDashBoardStats();
    eventLogger.info("Dashboard stats retrieved successfully");
    res.status(200).json({ success: true, data: stats });
  } catch (err) {
    eventLogger.error("Error retrieving dashboard stats");
    res.status(500).json({ success: false, message: "Error fetching stats" });
  }
};

//Vehicle
const getVehicles = async (req, res) => {
  try {
    const status = req.query.status;
    const vehicles = await adminServices.getVehicles(status);
    eventLogger.info("Vehicles retrieved successfully");
    res.status(200).json({ success: true, data: vehicles });
  } catch (err) {
    eventLogger.error("Error retrieving vehicles");
    res
      .status(500)
      .json({ success: false, message: "Error fetching vehicles" });
  }
};

const addVehicle = async (req, res) => {
  try {
    const newVehicle = req.body;
    const vehicle = await adminServices.addVehicle(newVehicle);
    eventLogger.info("Vehicle added successfully");
    res.status(201).json({ success: true, data: vehicle });
  } catch (err) {
    eventLogger.error("Error adding vehicle");
    res.status(500).json({ success: false, message: "Error adding vehicle" });
  }
};

//Driver
const getDrivers = async (req, res) => {
  try {
    const status = req.query.status;
    const drivers = await adminServices.getDrivers(status);
    eventLogger.info("Drivers retrieved successfully");
    res.status(200).json({ success: true, data: drivers });
  } catch (err) {
    eventLogger.error("Error retrieving drivers");
    res.status(500).json({ success: false, message: "Error fetching drivers" });
  }
};

const addDriver = async (req, res) => {
  try {
    const newDriver = req.body;
    const driver = await adminServices.addDriver(newDriver);
    eventLogger.info("Driver added successfully");
    res.status(201).json({ success: true, data: driver });
  } catch (err) {
    eventLogger.error("Error adding driver");
    res.status(500).json({ success: false, message: "Error adding driver" });
  }
};

//Staff
const addStaff = async (req, res) => {
  try {
    const newStaff = req.body;
    const staff = await adminServices.addStaff(newStaff);
    eventLogger.info("Staff added successfully");
    res.status(201).json({ success: true, data: staff });
  } catch (err) {
    eventLogger.error("Error adding staff");
    res.status(500).json({ success: false, message: "Error adding staff" });
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
