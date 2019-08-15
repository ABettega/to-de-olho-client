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
    if (this.state.loggedInUser === null || this.state.loggedInUser === false) {
      return (
        <nav>
          <div>
          <Link className="nav-a" to="/">
                <div>
                <img className="eye-animation" src="/images/eye-illustration.svg"></img>
                <img className="logo desappear" src="/images/logov.png" alt="go"/>
                </div>
              </Link>
          </div>
          <div className="links-nav">
          <ul className="nav-ul">
            <li>
              <Link className="nav-a" to="/registrar">
                <div className="hover-nav desappear">
                  Cadastre-se
                </div>
              </Link>
            </li>
            <li>
              <Link className="nav-a" to="/login">
                <div className="hover-nav">
                  Login
                </div>
              </Link>
            </li>
            <li>
              <Link className="nav-a" to="/pesquisar">
                <div className="hover-nav">
                  Pesquisar
                </div>
              </Link>
            </li>
          </ul>
          </div>
        </nav>
      );
    } else {
      return (
        <nav>
          <div>
          <Link className="nav-a" to="/">
                <div className="hover-nav">
                <div className="eye-animation"></div>
                <img className="logo" src="/images/logov.png" alt="go"/>
                </div>
              </Link>
          </div>
          <div className="links-nav">
          <ul className="nav-ul">
            <li>
              <Link className="nav-a" to="/pesquisar">
                <div className="hover-nav">
                  Pesquisar
                </div>
              </Link>
            </li>
            <li>
              <Link className="nav-a" to="/dashboard">
                <div className="hover-nav desappear">
                  Dashboard
                </div>
              </Link>
            </li>
            <li>
              <Link className="nav-a" to="/">
                <div className="hover-nav" onClick={() =>  this.logoutUser()}>
                Sair
                </div>
              </Link>
            </li>
          </ul>
          </div>
        </nav>
      );
    }
  }
}

export default Navbar;
