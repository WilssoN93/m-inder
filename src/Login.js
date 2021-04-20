import React from 'react';
import { auth, provider } from './firebase';
import './Login.css';
import logo from './images/minder-logo.jpg';

function Login() {
  function signIn() {
    auth.signInWithRedirect(provider).catch((error) => alert(error.message));
  }

  return (
    <div className='login'>
      <div className='login__login-container'>
        <div className='login__logo'>
          <img src={logo} alt='m-inder logo' />
        </div>
        <div className="login__button">
          <img
            src='https://www.happiness.se/sites/default/files/2019-03/google-logo.svg'
            alt='Google'
          />
          <button onClick={signIn}>Sign in With Google</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
