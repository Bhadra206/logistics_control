const mongoose = require("mongoose");

const vehicleSchema = new mongoose.schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  registrationNo: { type: String, required: true },
  purpose: { type: String, enum: ["passenger", "goods"], default: "passenger" },
  type: { type: String, enum: ["LMV", "HMV", "Both"], default: "LMV" },
  ratePerKm: { type: Number, required: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;
