import React from "react";
import {
  useHistory,
  useRouteMatch,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import "./LoginOptions.css";
import OTPLogin from "./OTPLogin/OTPLogin";
import LoginWithOTP from "./RequestOTP/LoginWithOTP";
import EmailPassword from "./EmailPassword/EmailPassword";
const LoginOptions = () => {
  const history = useHistory();
  const path = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path="/login/emailPassword">
          <EmailPassword />
        </Route>
        <Route path="/login/otp">
          <OTPLogin />
        </Route>
        <Route path="/login/otp-password">
          <LoginWithOTP />
        </Route>
        <Route exact path="/login">
          <h2>Login Options</h2>
          <div className="loginOptions">
            <div
              className="loginOption1"
              onClick={() => history.push("/login/emailPassword")}
            >
              <p className="loginOptions-title">
                Login With Email and Password
              </p>
            </div>
            <div
              className="loginOption2"
              onClick={() => history.push("/login/otp")}
            >
              <p className="loginOptions-title"> OTP login</p>
              <p className="loginOptions-summary">
                Login with a One-Time-Password sent to your email or phone
                number
              </p>
            </div>
            <Link to="/signup">Don't have an account? Register here</Link>
          </div>
        </Route>
      </Switch>
    </>
  );
};

export default LoginOptions;
