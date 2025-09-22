const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverControllers");

router.put("/:id", driverController.updateDriver);
router.patch("/:id/archive", driverController.archiveDriver);
router.patch("/:id/restore", driverController.restoreDriver);
router.delete("/:id", driverController.deleteDriver);

module.exports = router;
