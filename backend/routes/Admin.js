// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const AdminControllers = require("../controllers/adminControllers");

const {
  driverValidation,
  vehicleValidation,
  staffValidation,
  validationRes,
} = require("../middleware/validation/validation");

//Admin Dashboard
router.get("/stats", AdminControllers.getDashBoardStats);

//Vehicle
router.post(
  "/addVehicle",
  vehicleValidation,
  validationRes,
  AdminControllers.addVehicle
);

router.get("/vehicles", AdminControllers.getVehicles);

//Driver
router.post(
  "/addDriver",
  driverValidation,
  validationRes,
  AdminControllers.addDriver
);

router.get("/drivers", AdminControllers.getDrivers);

//  Staff
router.post(
  "/addStaff",
  staffValidation,
  validationRes,
  AdminControllers.addStaff
);

module.exports = router;
