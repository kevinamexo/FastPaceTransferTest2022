const db = require("../db.js");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");

const saltRounds = 10;

exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT *  FROM user WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send({ err });
    }
    console.log(result);
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (response) {
          res.send({
            message: "Successfully logged in",
            data: result[0],
            success: true,
          });
        } else {
          res.send({
            message: "Wrong email/password",
            data: null,
            success: false,
          });
        }
      });
    } else {
      res.send({ message: "User does not exist", data: null, success: false });
    }
  });
};

exports.requestOTP = (req, res) => {
  const { otp_type, email, phone_number } = req.body;

  const newOTP = otpGenerator.generate(6, {
    upperCaseAlphabets: true,
    specialChars: true,
  });
  const hashedOTP = bcrypt.hash(newOTP, saltRounds, (error, hash) => {
    if (error) {
      return res.send({
        data: null,
        sucess: false,
        message: "Error creating user",
      });
    }
  });
  let queryStr;
  let otpFields;
  if (otp_type === "email") {
    queryStr = `UPDATE user SET otp_password = ?, otp_expires_at = ? otp_type= ?, WHERE email = ?`;
    otpFields = [hashedOTP, expiresIn, email, otp_type];
  } else if (otp_type === "sms") {
    queryStr = `UPDATE user SET otp_password = ?, otp_expires_at = ?, otp_type= ?, WHERE phone_number = ?`;
    otpFields = [hashedOTP, expiresIn, phone_number, otp_type];
  }
  if (!queryStr) return;
  db.query(queryStr, otpFields, (err, rows) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send({ newOTP: newOTP });
    }
  });
};

exports.otpLogin = (req, res) => {
  console.log("OTP LOGIN");
  const { email, otp_password, phone_number } = req.body;
  let query;
  let values;
  if (otp_password && phone_number === null) {
    query = "SELECT *  FROM user WHERE email = ?";
    values = [email];
  } else if (phone_number && email === null) {
    query = "SELECT *  FROM user WHERE phone_number = ?";
    values = [phone_number];
  }
  db.query(query, values, (err, result) => {
    if (err) {
      res.send({ err });
    }
    console.log(result);
    if (result.length > 0) {
      bcrypt.compare(otp_password, result[0].otp_password, (err, response) => {
        if (response) {
          res.send({
            message: "Successfully logged in",
            data: result[0],
            success: true,
          });
        } else {
          res.send({
            message: "Invalid OTP",
            data: null,
            success: false,
          });
        }
      });
    } else {
      res.send({ message: "User does not exist", data: null, success: false });
    }
  });
};
