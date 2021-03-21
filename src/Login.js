import React from "react";
import { auth, provider } from "./firebase";
import "./Login.css";

function Login() {
  function signIn() {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  }

  return (
    <div className="login">
      <div className="login__login-container">
        <img
          src="https://www.happiness.se/sites/default/files/2019-03/google-logo.svg"
          alt="Google"
        />
        <button onClick={signIn}>Sign in With Google</button>
      </div>
    </div>
  );
}

export default Login;
