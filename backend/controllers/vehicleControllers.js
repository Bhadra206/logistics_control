const adminServices = require("../service/adminServices");
const { eventLogger } = require("./logger.js");

// Update
const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const vehicle = await adminServices.updateVehicle(id, updateData);

    if (!vehicle) {
      return res
        .status(404)
        .json({ success: false, message: "Vehicle not found" });
    }

    eventLogger.info(`Vehicle ${id} updated successfully`);
    res.status(200).json({ success: true, data: vehicle });
  } catch (err) {
    eventLogger.error("Error updating vehicle");
    res.status(500).json({ success: false, message: "Error updating vehicle" });
  }
};

// Archive
const archiveVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    const vehicle = await adminServices.archiveVehicle(id);

    if (!vehicle) {
      return res
        .status(404)
        .json({ success: false, message: "Vehicle not found" });
    }

    eventLogger.info(`Vehicle ${id} archived successfully`);
    res.status(200).json({ success: true, data: vehicle });
  } catch (err) {
    eventLogger.error("Error archiving vehicle");
    res
      .status(500)
      .json({ success: false, message: "Error archiving vehicle" });
  }
};

// Restore
const restoreVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    const vehicle = await adminServices.restoreVehicle(id);

    if (!vehicle) {
      return res
        .status(404)
        .json({ success: false, message: "Vehicle not found" });
    }

    eventLogger.info(`Vehicle ${id} restored successfully`);
    res.status(200).json({ success: true, data: vehicle });
  } catch (err) {
    eventLogger.error("Error restoring vehicle");
    res
      .status(500)
      .json({ success: false, message: "Error restoring vehicle" });
  }
};

// Delete
const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    const vehicle = await adminServices.deleteVehicle(id);

    if (!vehicle) {
      return res
        .status(404)
        .json({ success: false, message: "Vehicle not found" });
    }

    eventLogger.info(`Vehicle ${id} deleted successfully`);
    res.status(200).json({ success: true, message: "Vehicle deleted" });
  } catch (err) {
    eventLogger.error("Error deleting vehicle");
    res.status(500).json({ success: false, message: "Error deleting vehicle" });
  }
};

module.exports = {
  updateVehicle,
  archiveVehicle,
  restoreVehicle,
  deleteVehicle,
};
