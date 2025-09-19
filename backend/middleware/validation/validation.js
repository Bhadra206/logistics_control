const { check, validationResult, body } = require("express-validator");

const loginValidation = [
  check("email").notEmpty().withMessage("Email is required"),
  check("password").notEmpty().withMessage("Password is required"),
];
const vehicleValidation = [
  check("name").notEmpty().withMessage("Name is required"),
  check("model").notEmpty().withMessage("Model is required"),
  check("registrationNo")
    .notEmpty()
    .withMessage("Registration Number is required"),
  check("purpose").notEmpty().withMessage("Purpose is required"),
  check("type").notEmpty().withMessage("Type is required"),
  check("ratePerKm").notEmpty().withMessage("Rate per KM is required"),
  check("status").notEmpty().withMessage("Status is required"),
];
const driverValidation = [
  check("name").notEmpty().withMessage("Name is required."),
  check("mobile").notEmpty().withMessage("Mobile is required."),
  check("perDayRate").notEmpty().withMessage("Per day rate is required."),
  check("overTimeRate").notEmpty().withMessage("Overtime rate is required."),
  check("licence").notEmpty().withMessage("Licence type is required."),
  check("status").notEmpty().withMessage("Status is required."),
];
const staffValidation = [
  check("firstName").notEmpty().withMessage("First Name is required."),
  check("lastName").notEmpty().withMessage("Last Name is required."),
  check("email").notEmpty().withMessage("Email is required."),
  check("dob").notEmpty.withMessage("Date of Birth is required."),
  check("gender").notEmpty().withMessage("Gender is required."),
  check("mobile").notEmpty().withMessage("Mobile is required."),
  check("address").notEmpty().withMessage("Address is required."),
  check("position").notEmpty().withMessage("Position is required."),
  check("password").notEmpty().withMessage("Password is required."),
  check("type").notEmpty().withMessage("Type is required."),
];
const orderValidation = [
  check("customerName").notEmpty().withMessage("Customer Name is required."),
  check("Customeremail").notEmpty().withMessage("Custmer Email is required."),
  check("customermobile")
    .notEmpty()
    .withMessage("Customer Mobile is required."),
  check("placeOfCustomer").notEmpty().withMessage("Place is required."),
  check("startLoc").notEmpty().withMessage("Start Location is required."),
  check("dropLoc").notEmpty().withMessage("Drop Location is required."),
  check("startDate").notEmpty().withMessage("Start Date is required."),
  check("endDate").notEmpty().withMessage("End Date is required."),
  check("typeOfService").notEmpty().withMessage("Type of service is required."),
  check("distance").notEmpty().withMessage("Distance is required."),

  // Either weight or number of passenger required
  body().custom((value, { req }) => {
    if (!req.body.numPassengers && !req.body.weight) {
      throw new Error("Either weight or number of passengers is required");
    }
    return true;
  }),
];

const validationRes = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  next();
};

module.exports = {
  loginValidation,
  orderValidation,
  driverValidation,
  vehicleValidation,
  staffValidation,
  validationRes,
};
