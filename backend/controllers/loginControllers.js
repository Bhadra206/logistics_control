const { loginStaff } = require("../service/loginServices");
const { eventLogger } = require("./logger");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = await loginStaff(email, password);
    eventLogger.info("Login Successful");
    res.json({ message: "Login successful", ...data });
  } catch (err) {
    eventLogger.error("Login Failed");
    res.status(400).json({ message: err.message });
  }
};

module.exports = { login };
