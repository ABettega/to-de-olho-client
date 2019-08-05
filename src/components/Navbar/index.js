import React from "react";
import {Link} from "react-router-dom"
import "./navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul className="nav-ul">
        <li><Link className="nav-a" to="/">Explorar</Link></li>
        <img src="/images/logo.svg" alt="Logo do Tô de Olho"/>
        <li><Link className="nav-a" to="/entrar">Entrar</Link></li>
        <li><Link className="nav-a" to="/pesquisar">Pesquisar</Link></li>

      </ul>
    </nav>
  );
};

export default Navbar;
