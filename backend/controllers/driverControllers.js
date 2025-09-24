const driverServices = require("../service/driverServices");
const { eventLogger } = require("./logger");

// Update
const updateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const driver = await driverServices.updateDriver(id, updateData);

    if (!driver) {
      return res
        .status(404)
        .json({ success: false, message: "Driver not found" });
    }

    eventLogger.info(`Driver ${id} updated successfully`);
    res.status(200).json({ success: true, data: driver });
  } catch (err) {
    eventLogger.error("Error updating driver");
    res.status(500).json({ success: false, message: err.message });
  }
};

// Archive
const archiveDriver = async (req, res) => {
  try {
    const { id } = req.params;

    const driver = await driverServices.archiveDriver(id);

    if (!driver) {
      return res
        .status(404)
        .json({ success: false, message: "Driver not found" });
    }

    eventLogger.info(`Driver ${id} archived successfully`);
    res.status(200).json({ success: true, data: driver });
  } catch (err) {
    eventLogger.error("Error archiving driver");
    res.status(500).json({ success: false, message: err.message });
  }
};

// Restore
const restoreDriver = async (req, res) => {
  try {
    const { id } = req.params;

    const driver = await driverServices.restoreDriver(id);

    if (!driver) {
      return res
        .status(404)
        .json({ success: false, message: "Driver not found" });
    }

    eventLogger.info(`Driver ${id} restored successfully`);
    res.status(200).json({ success: true, data: driver });
  } catch (err) {
    eventLogger.error("Error restoring driver");
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete
const deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;

    const driver = await driverServices.deleteDriver(id);

    if (!driver) {
      return res
        .status(404)
        .json({ success: false, message: "Driver not found" });
    }

    eventLogger.info(`Driver ${id} deleted successfully`);
    res.status(200).json({ success: true, message: "Driver deleted" });
  } catch (err) {
    eventLogger.error("Error deleting driver");
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  updateDriver,
  archiveDriver,
  restoreDriver,
  deleteDriver,
};
