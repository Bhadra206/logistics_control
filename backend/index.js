const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const admin = require("./routes/Admin");
const staff = require("./routes/Staff");
const vehicle = require("./routes/vehicles");
const driver = require("./routes/drivers");
const order = require("./routes/orders");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", admin);
app.use("/staff", staff);
app.use("/vehicle", vehicle);
app.use("/driver", driver);
app.use("/order", order);

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
