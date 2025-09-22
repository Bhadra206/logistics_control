const Driver = require("../schema/driverSchema");
const Order = require("../schema/orderSchema");

// Edit
const updateDriver = async (driverId, updateData) => {
  return await Driver.findByIdAndUpdate(driverId, updateData, {
    new: true,
    runValidators: true,
  });
};

//Archive
const archiveDriver = async (driverId) => {
  return await Driver.findByIdAndUpdate(
    driverId,
    { status: "Inactive" },
    { new: true }
  );
};

//Restore
const restoreDriver = async (driverId) => {
  return await Driver.findByIdAndUpdate(
    driverId,
    { status: "Active" },
    { new: true }
  );
};

//Delete
const deleteDriver = async (driverId) => {
  const allocatedOrder = await Order.findOne({
    driver: driverId,
    status: { $in: ["Allocated", "In Progress"] },
  });

  if (allocatedOrder) {
    throw new Error(
      "Cannot delete driver. Driver is allocated to an active order."
    );
  }

  return await Driver.findByIdAndDelete(driverId);
};

module.exports = {
  updateDriver,
  archiveDriver,
  restoreDriver,
  deleteDriver,
};
