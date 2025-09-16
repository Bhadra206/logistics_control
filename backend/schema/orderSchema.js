const mongoose = require("mongoose");

const orderSchema = new mongoose.schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerMobile: { type: String, required: true },
  placeOfCustomer: { type: String, required: true },
  startLoc: { type: String, required: true },
  dropLoc: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  numberOfDays: { type: Number, required: true },
  typeOfService: {
    type: String,
    enum: ["passenger", "goods"],
    default: "passenger",
    required: true,
  },
  numPassengers: { type: Number, required: false },
  weight: { type: Number, required: false },
  distance: { type: Number, required: true },
  driver: { type: ObjectId, required: false },
  vehicle: { type: ObjectId, required: false },
  TotalCost: { type: Number, required: false },
  overtimeHours: { type: Number, required: false },
  status: {
    type: String,
    enum: ["Completed", "In Progress", "Cancelled", "Pending"],
    default: "Pending",
    required: false,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
