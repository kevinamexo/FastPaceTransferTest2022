const express = require("express");
const authControllers = require("../controllers/authControllers");
const router = express.Router();

router.route("/request-otp").post(authControllers.requestOTP);
router.route("/").post(authControllers.loginUser);
router.route("/otp-login").post(authControllers.otpLogin);

module.exports = router;
