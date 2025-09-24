const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleControllers");

router.put("/updateVehicle/:id", vehicleController.updateVehicle);
router.patch("/:id/archive", vehicleController.archiveVehicle);
router.patch("/:id/restore", vehicleController.restoreVehicle);
router.delete("/deleteVehicle/:id", vehicleController.deleteVehicle);

module.exports = router;
