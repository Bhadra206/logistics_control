const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverControllers");

router.put("/updateDriver/:id", driverController.updateDriver);
router.patch("/:id/archive", driverController.archiveDriver);
router.patch("/:id/restore", driverController.restoreDriver);
router.delete("/deleteDriver/:id", driverController.deleteDriver);

module.exports = router;
