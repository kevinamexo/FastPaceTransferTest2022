import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./OTPLogin.css";

const OTPLogin = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");
  const history = useHistory();

  const [otpMethod, setOtpMethod] = useState("email");

  const handleChangeOTPMethod = (event) => {
    setOtpMethod(event.target.value);
  };

  const handleEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [email]
  );

  const handleOTPLogin = useCallback(
    (e) => {
      setSignUpMessage("");
      e.preventDefault();

      if (!otpMethod) return setSignUpMessage("Select the OTP method");
      if (!otpMethod) return;
      console.log("Handling OTP");
      axios
        .post("http://localhost:8000/api/login/request-otp", {
          otpMethod: email,
        })
        .then((res) => {
          console.log(res);
          if (!res.data.success) {
            console.log("Error logging in");
            setSignUpMessage(res.data.message);
          }
          if (res.data.success === true) {
            console.log(res.data);
            setSignUpMessage("Logged in successfully");
          }
          history.push("/login/otp-password");
        })
        .catch((e) => {
          console.log(e);
        });
    },

    [email, otpMethod]
  );
  return (
    <div className="loginPage">
      <h2>OTP Request</h2>
      <form onSubmit={handleOTPLogin} className="loginForm">
        <div className="formGroup">
          <label htmlFor="email">Email or Phone Number</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="formGroup">
          <div>
            <input
              type="radio"
              value="email"
              checked={otpMethod === "email"}
              onChange={handleChangeOTPMethod}
            />{" "}
            Email
          </div>
          <div>
            <input
              type="radio"
              value="sms"
              checked={otpMethod === "sms"}
              onChange={handleChangeOTPMethod}
            />{" "}
            SMS
          </div>
        </div>
        <button type="submit">Request OTP</button>
      </form>
    </div>
  );
};

export default OTPLogin;
