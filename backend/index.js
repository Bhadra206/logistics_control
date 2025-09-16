const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//const logistics = require('')
const  Vehicle = require('./schema/vehicleSchema')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use("/", logistics);

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Logistics");
    console.log("Connected to mongoDB");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB();

const port = 3000;

app.listen(port, () => {
  console.log("Server Started successfully");
});

// const newVehicle = new Vehicle({
//   name: "THAR",
//   model: "2023",
//   registrationNo: "KA01AB1235",
//   purpose: "passenger",
//   type: "LMV",
//   ratePerKm: 10,
// });

// // 3. Save it
// newVehicle
//   .save()
//   .then((doc) => {
//     console.log("🚀 Vehicle saved:", doc);
//     mongoose.connection.close(); // close connection after save
//   })
//   .catch((err) => {
//     console.error("❌ Error saving vehicle:", err);
//     mongoose.connection.close();
//   });
