import { Avatar } from "@material-ui/core";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import "./Header.css";

function Header() {
  const [user] = useAuthState(auth);
  return (
    <div className="header">
      <div className="header__left">
        <Avatar className="header__avatar" src={user?.photoURL} />
        <h3>{user?.displayName}</h3>
      </div>
      <div className="header__center">
        <h1>Center</h1>
      </div>
      <div className="header__right">
        <button onClick={() => auth.signOut()}>Sign Out</button>
      </div>
    </div>
  );
}

export default Header;
