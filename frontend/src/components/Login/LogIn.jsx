import React, { useState } from "react";
import "./LogIn.css";
import { assets } from "../../assets/assets";
const LogIn = ({ setShowLonIn }) => {
  const [currentState, setCurrentState] = useState("Sign up");
  return (
    <div className="login">
      <form className="login-popup-container">
        <div className="loin-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLonIn(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-input">
          {currentState === "Login" ? null : (
            <input type="text" placeholder="Your name" required />
          )}
          <input type="email" placeholder="Your email" required />
          <input type="password" placeholder="Password" required />
        </div>
        <button>
          {currentState === "Sign up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have a account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LogIn;
