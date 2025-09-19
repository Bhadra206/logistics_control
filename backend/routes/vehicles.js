const express = require("express");
const router = express.Router();
const vehicleController = require("../controller/vehicleController");

router.put("/:id", vehicleController.updateVehicle);
router.patch("/:id/archive", vehicleController.archiveVehicle);
router.patch("/:id/restore", vehicleController.restoreVehicle);
router.delete("/:id", vehicleController.deleteVehicle);

module.exports = router;
