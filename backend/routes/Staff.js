const express = require("express");
const router = express.router();
const staffController = require("../controllers/staffControllers");

router.get("/:id", staffController.getStaff);
router.put("/:id", staffController.updateStaff);
router.delete("/:id", staffController.deleteStaff);

module.exports = router;
