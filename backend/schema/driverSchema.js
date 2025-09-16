const mongoose = require("mongoose");

const driverSchema = new mongoose.schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  perDayRate: { type: Number, required: true },
  overTimeRate: { type: Number, required: true },
  licence: { type: String, enum: ["LMV", "HMV", "Both"], default: "LMV" },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
});

const Driver = mongoose.model("Driver", driverSchema);
module.exports = Driver;