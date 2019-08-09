import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import AuthService from "../Auth/auth-services";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  componentDidMount() {
    this.props.getUser();
  }

  logoutUser = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);
    });
  };

  render() {
    if (this.state.loggedInUser === false || this.state.loggedInUser === null || this.state.loggedInUser === undefined) {
      return (
        <nav>
          <ul className="nav-ul">
            <li className="">
              <Link className="nav-a" to="/">
                <div>
                <div className="eye-animation"></div>
                  Tô de Olho
                </div>
              </Link>
            </li>
            <li>
              <Link className="nav-a" to="/registrar">
                <div>
                  <img
                    id="registrar"
                    src="/images/user.png"
                    alt="Imagem para registrar"
                  />
                  Registrar
                </div>
              </Link>
            </li>
            <li>
              <Link className="nav-a" to="/login">
                <div>
                  <img
                    id="login"
                    src="/images/user.png"
                    alt="Imagem para login"
                  />
                  Login
                </div>
              </Link>
            </li>
            <li>
              <Link className="nav-a" to="/pesquisar">
                <div>
                  <img
                    id="pesquisar"
                    src="/images/pesquisar.png"
                    alt="Imagem para pesquisar"
                  />
                  Pesquisar
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      );
    } else {
      return (
        <nav>
          <ul className="nav-ul">
            <li>
              <Link className="nav-a" to="/">
                <div className="eye-animation"></div>
                <div className="logo-home">Tô de Olho</div>
              </Link>
            </li>
            <li>
              <Link className="nav-a home" to="/">
                <div>
                  Home
                </div>
              </Link>
            </li>
            <li>
              <Link className="nav-a" to="/pesquisar">
                <div>
                  {/* <img
                    id="pesquisar"
                    src="/images/pesquisar.png"
                    alt="Imagem para pesquisar"
                  /> */}
                  Pesquisar
                </div>
              </Link>
            </li>
            <li>
              <Link className="nav-a" to="/dashboard">
                <div>
                  {/* <img src="./images/home.png" alt="Imagem para dashboard" /> */}
                  Dashboard
                </div>
              </Link>
            </li>
            <li>
              <Link className="nav-a" to="/">
                <div onClick={() => this.logoutUser()}>
                  {/* <img src="./images/user.png" alt="Imagem para logout" /> */}
                  Sair
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      );
    }
  }
}

export default Navbar;
