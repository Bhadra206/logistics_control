const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Staff = require("../schema/staffSchema");

const JWT_SECRET = "your_secret_key_here";

const loginStaff = async (email, password) => {
  const staff = await Staff.findOne({ email });
  if (!staff) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, staff.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = jwt.sign({ id: staff._id, type: staff.type }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return {
    staff: {
      id: staff._id,
      name: `${staff.firstName} ${staff.lastName}`,
      email: staff.email,
      type: staff.type,
    },
    token,
  };
};

module.exports = { loginStaff };
