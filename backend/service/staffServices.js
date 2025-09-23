const Staff = require("../schema/staffSchema");

const getStaff = async () => {
  try {
    const staff = await Staff.find();
    return staff;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateStaff = async (staffId, updateData) => {
  try {
    const staff = await Staff.findByIdAndUpdate(staffId, updateData, {
      new: true,
    });
    return staff;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteStaff = async (staffId) => {
  try {
    const staff = await Staff.findByIdAndDelete(sataffId);
    return staff;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = { getStaff, updateStaff, deleteStaff };
