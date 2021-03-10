import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <h1>Left</h1>
      </div>
      <div className="header__center">
        <h1>Center</h1>
      </div>
      <div className="header__right">
        <h1>Right</h1>
      </div>
    </div>
  );
}

export default Header;
