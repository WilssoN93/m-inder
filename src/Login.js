import React from "react";
import { auth, provider } from "./firebase";

function Login() {
  function signIn() {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  }

  return (
    <div>
      <button onClick={signIn}></button>
    </div>
  );
}

export default Login;
