import React from "react";
import {Link} from "react-router-dom"
import "./navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Explorar</Link></li>
        <img src="/images/example-logo.png"/>
        <li><Link to="/signup">Entrar</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
