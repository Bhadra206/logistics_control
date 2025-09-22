const express = require("express");
const { login } = require("../controllers/loginControllers");
const router = express.Router();

router.post("/login", login);

module.exports = router;
