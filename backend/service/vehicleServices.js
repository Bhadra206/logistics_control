const Vehicle = require("../schema/vehicleSchema");
const Order = require("../schema/orderSchema");

//Edit
const updateVehicle = async (vehicleId, updateData) => {
  return await Vehicle.findByIdAndUpdate(vehicleId, updateData, {
    new: true,
    runValidators: true,
  });
};

// Archive
const archiveVehicle = async (vehicleId) => {
  return await Vehicle.findByIdAndUpdate(
    vehicleId,
    { status: "Inactive" },
    { new: true }
  );
};

//Restore
const restoreVehicle = async (vehicleId) => {
  return await Vehicle.findByIdAndUpdate(
    vehicleId,
    { status: "Active" },
    { new: true }
  );
};

//Delete
const deleteVehicle = async (vehicleId) => {
  const allocatedOrder = await Order.findOne({
    vehicle: vehicleId,
    status: { $in: ["Allocated", "In Progress"] },
  });

  if (allocatedOrder) {
    throw new Error(
      "Cannot delete vehicle. Vehicle is allocated to an active order."
    );
  }

  return await Vehicle.findByIdAndDelete(vehicleId);
};

module.exports = {
  updateVehicle,
  archiveVehicle,
  restoreVehicle,
  deleteVehicle,
};
