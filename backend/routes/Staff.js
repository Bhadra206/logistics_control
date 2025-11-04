const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffControllers");

router.get("/getStaff", staffController.getStaff);
router.put("/updateStaff/:id", staffController.updateStaff);
router.patch("/:id/archive", staffController.archiveStaff);
router.patch("/:id/restore", staffController.restoreStaff);
router.delete("/deleteStaff/:id", staffController.deleteStaff);

module.exports = router;
