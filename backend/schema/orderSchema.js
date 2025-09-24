const mongoose = require("mongoose");
const { Types } = mongoose;

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerMobile: { type: String, required: true },
    placeOfCustomer: { type: String, required: true },
    startLoc: { type: String, required: true },
    dropLoc: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    numberOfDays: { type: Number, required: false },
    typeOfService: {
      type: String,
      enum: ["passenger", "goods"],
      default: "passenger",
      required: true,
    },
    numPassengers: { type: Number, required: false },
    weight: { type: Number, required: false },
    distance: { type: Number, required: true },
    driver: { type: Types.ObjectId, ref: "Driver", required: false },
    vehicle: { type: Types.ObjectId, ref: "Vehicle", required: false },
    TotalCost: { type: Number, required: false },
    overtimeHours: { type: Number, required: false },
    status: {
      type: String,
      enum: ["Completed", "In Progress", "Cancelled", "Pending", "Allocated"],
      default: "Pending",
      required: false,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
