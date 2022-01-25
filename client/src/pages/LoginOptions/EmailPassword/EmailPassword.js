import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const EmailPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userObj, setUserObj] = useState({});
  const [message, setMessage] = useState("");

  const handleEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [email]
  );
  const handlePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [password]
  );

  const handleEmailPasswordLogin = useCallback(
    (e) => {
      e.preventDefault();
      console.log("Handling email and password login");

      axios
        .post("http://localhost:8000/api/login", {
          email,
          password,
        })
        .then((res) => {
          console.log(res);
          setMessage(res.data.message);
          if (res.data.data) setUserObj(res.data.data);
        })
        .catch((e) => console.log(e));
    },
    [email, password]
  );

  return (
    <div className="loginPage">
      <h2>Login with Email and Password</h2>
      <h2>{message && message}</h2>
      <form onSubmit={handleEmailPasswordLogin} className="loginForm">
        <div className="formGroup">
          <label htmlFor="email">Email address</label>
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
        <button type="submit"> Login</button>
      </form>
      <h2>{userObj && userObj.email}</h2>
      <Link to="/">Home</Link>
    </div>
  );
};

export default EmailPassword;
