const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    model: { type: String, required: true },
    registrationNo: { type: String, required: true },
    purpose: {
      type: String,
      enum: ["passenger", "goods", "both"],
      default: "passenger",
      required: true,
    },
    type: {
      type: String,
      enum: ["LMV", "HMV", "Both"],
      default: "LMV",
      required: true,
    },
    ratePerKm: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
      required: true,
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;
