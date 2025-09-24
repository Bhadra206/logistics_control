const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const staffSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "",
      required: true,
    },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    position: { type: String, required: true },
    password: { type: String, required: true },
    type: {
      type: String,
      enum: ["admin", "staff"],
      default: "staff",
      required: true,
    },
  },
  { timestamps: true }
);

staffSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Staff = mongoose.model("Staff", staffSchema);
module.exports = Staff;
