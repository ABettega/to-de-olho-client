import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul className="nav-ul">
        <li>
          <Link className="nav-a" to="/entrar">
            <div>
              <img
                id="entrar"
                src="./images/user.png"
                alt="Imagem para entrar"
              />
              Entrar
            </div>
          </Link>
        </li>
        <li>
          <Link className="nav-a" to="/">
            <div>
              <img id="home" src="./images/home.png" alt="Imagem para home" />
              Home
            </div>
          </Link>
        </li>
        <li>
          <Link className="nav-a" to="/pesquisar">
            <div>
              <img
                id="pesquisar"
                src="./images/pesquisar.png"
                alt="Imagem para pesquisar"
              />
              Pesquisar
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
