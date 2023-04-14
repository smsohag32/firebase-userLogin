import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between h-20 items-center">
      <h1>Fire Base Integrations</h1>
      <ul className="flex gap-5">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/singup">Sing Up</Link>
        <Link to="/about">About</Link>
      </ul>
    </div>
  );
};

export default Header;
