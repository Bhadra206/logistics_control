const staffServices = require("../service/staffServices");
const { eventLogger } = require("../controllers/logger");

const getStaff = async (req, res) => {
  try {
    const staff = await staffServices.getStaff();
    eventLogger.info("Successfully retrieved the staff");
    res.status(200).json({ success: true, data: staff });
  } catch (err) {
    console.log(err);
    eventLogger.error("Error retrieving the staff");
    res.status(500).json({ success: false, msg: err.message });
  }
};

const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const staff = await staffServices.updateStaff(id, updateData);
    eventLogger.info("Successfully updated the staff");
    res.status(200).json({ success: true, data: staff });
  } catch (err) {
    console.log(err);
    eventLogger.error("Error updating the staff");
    res.status(500).json({ success: false, msg: err.message });
  }
};

const archiveStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await staffServices.archiveStaff(id);

    if (!staff) {
      return res
        .status(404)
        .json({ success: false, message: "Staff not found" });
    }

    eventLogger.info(`Staff ${id} archived successfully`);
    res.status(200).json({ success: true, data: staff });
  } catch (err) {
    eventLogger.error("Error archiving staff");
    res.status(500).json({ success: false, message: err.message });
  }
};

// Restore
const restoreStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await staffServices.restoreStaff(id);

    if (!staff) {
      return res
        .status(404)
        .json({ success: false, message: "Staff not found" });
    }

    eventLogger.info(`Staff ${id} restored successfully`);
    res.status(200).json({ success: true, data: staff });
  } catch (err) {
    eventLogger.error("Error restoring staff");
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    await staffServices.deleteStaff(id);
    eventLogger.info(`Staff ${id} deleted successfully`);
    res.status(200).json({ success: true, message: "Staff Deleted" });
  } catch (err) {
    console.log(err);
    eventLogger.error("Error deleting the staff");
    res.status(500).json({ success: false, msg: err.message });
  }
};

module.exports = {
  getStaff,
  updateStaff,
  archiveStaff,
  restoreStaff,
  deleteStaff,
};
