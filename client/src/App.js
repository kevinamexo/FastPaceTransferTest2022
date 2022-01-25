import React, { useState, useCallback } from "react";
import { Switch, Route, Link } from "react-router-dom";
import LoginOptions from "./pages/LoginOptions/LoginOptions";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import Questions from './pages/Questions/Questions'
import "./App.css";

function Layout() {
  return (
    <div>
      <h2>FastPaceTransfer2022</h2>
      <Link to="/login">Login</Link>
      <Link to="signup">Sign up</Link>
    </div>
  );
}

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(null);

  //FORM HANDLERS
  const handleEmailInput1 = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [email]
  );
  const handlePasswordInput1 = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [password]
  );

  // <div className="loginOptions">
  //   <div className="">Login With Email and Password</div>
  //   <div className="loginOption2">OTP login</div>
  // </div>
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Layout} />
        <Route path="/login" component={LoginOptions} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/questions" component={Questions}/>
      </Switch>
    </div>
  );
}

export default App;
