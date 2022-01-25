import React, { useState, useCallback } from "react";
import "./SignUpPage.css";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");

  //eventHandlers

  const handleFirstName = useCallback(
    (e) => {
      setFirstName(e.target.value);
    },
    [firstName]
  );
  const handleLastName = useCallback(
    (e) => {
      setLastName(e.target.value);
    },
    [lastName]
  );
  const handleEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [email]
  );
  const handlePhoneNumber = useCallback(
    (e) => {
      setPhoneNumber(e.target.value);
    },
    [phoneNumber]
  );
  const handlePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [password]
  );

  const handleConfirmPassword = useCallback(
    (e) => {
      setConfirmPassword(e.target.value);
    },
    [confirmPassword]
  );

  const resetFields = () => {
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSignUpSubmit = useCallback(
    (e) => {
      setSignUpMessage("");
      e.preventDefault();

      if (
        !password |
        !confirmPassword |
        !firstName |
        !lastName |
        !email |
        !phoneNumber
      )
        return setSignUpMessage("All fields are required");

      if (password !== confirmPassword)
        return setSignUpMessage("Passwords must match");

      console.log("Handling user registration");
      axios
        .post("http://localhost:8000/api/users", {
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
        })
        .then((res) => {
          console.log(res);
          if (!res.data.success) {
            console.log("Error creating user");
            setSignUpMessage(res.data.message);
          }
          if (res.data.success === true) {
            console.log("TRUE");
            console.log(res.data);
            resetFields();
            setSignUpMessage("User created successfully");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [email, password, confirmPassword, firstName, lastName, phoneNumber]
  );

  return (
    <div className="signUpPage">
      <h2>SignUp</h2>

      <div className="signup-message">{signUpMessage && signUpMessage}</div>
      <form onSubmit={handleSignUpSubmit} className="signUpForm">
        <div className="formGroup">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleFirstName}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleLastName}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumber}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
      <Link to="/login">Click here to login</Link>
    </div>
  );
};

export default SignUpPage;
