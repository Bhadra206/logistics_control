const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffControllers");

router.get("/getStaff", staffController.getStaff);
router.put("/:id", staffController.updateStaff);
router.delete("/:id", staffController.deleteStaff);

module.exports = router;
