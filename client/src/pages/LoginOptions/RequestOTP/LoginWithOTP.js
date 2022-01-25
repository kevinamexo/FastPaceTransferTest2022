import React, { useState, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

const LoginWithOTP = ({ otpType }) => {
  const history = useHistory();

  const [otpPassword, setOtpPassword] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");
  const [email, setEmail] = useState("");

  //eventHandlers

  const handleOTPPassword = useCallback(
    (e) => {
      setOtpPassword(e.target.value);
    },
    [otpPassword]
  );
  const handleEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [email]
  );

  const handleOTPSubmit = (e) => {
    setSignUpMessage("");
    e.preventDefault();

    if (!otpPassword) return setSignUpMessage("Enter the OTP ");
    if (!otpType) return;
    console.log("Handling OTP");
    axios
      .post("http://localhost:8000/api/login/otp-login", {
        otpType,
        otpPassword,
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
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="signUpPage">
      <h2>SignUp</h2>

      <div className="signup-message">{signUpMessage && signUpMessage}</div>
      <form onSubmit={handleOTPSubmit} className="signUpForm">
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
          <label htmlFor="otpPassword">Password</label>
          <input
            type="otpPassword"
            name="otpPassword"
            value={otpPassword}
            onChange={handleOTPPassword}
          />
        </div>

        <button type="submit">Login with OTP</button>
      </form>
    </div>
  );
};

export default LoginWithOTP;
