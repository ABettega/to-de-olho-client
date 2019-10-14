// NPM imports
import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Project imports
import "./Navbar.css";
import AuthService from "../Auth/auth-services";

// Styled components
const Navigation = styled.nav`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 55px;
  display: flex;
  justify-content: center;
  /* padding: 5px 0 18px; */
  z-index: 2;
  background-color: white;
  box-shadow: 0px 0px 12px 1px rgba(189, 189, 189, 0.47);
`;

const LogoContainer = styled.div`
  display: flex;
  width: 130px;
  align-items: center;
  @media (max-width: 400px) {
    width: 80px;
  }
`;

const Logo = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
  @media (max-width: 400px) {
    display: none;
  }
`;

const NavList = styled.ul`
  width: 100%;
  display: flex;
  list-style: none;
  align-items: center;
  justify-content: space-evenly;
`;

const NavItem = styled.li`
  margin-right: 8px;
`;

const SLink = styled(Link)`
  text-decoration: none;
  color: #4bbf5b;
  font-weight: 700;
`;

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
        <Navigation>
          <NavList className="nav-ul">
            <NavItem className="">
              <SLink className="nav-a" to="/">
                <LogoContainer>
                  <div className="eye-animation"></div>
                  <Logo className="logo" src="/images/logov.png" alt="go" />
                </LogoContainer>
              </SLink>
            </NavItem>
            <NavItem>
              <SLink className="nav-a" to="/registrar">
                <div>Registrar</div>
              </SLink>
            </NavItem>
            <NavItem>
              <SLink className="nav-a" to="/login">
                <div>
                  {/* <img
                    id="login"
                    src="./images/user.png"
                    alt="Imagem para login"
                  /> */}
                  Login
                </div>
              </SLink>
            </NavItem>
            <NavItem>
              <SLink className="nav-a" to="/pesquisar">
                <div>
                  {/* <img
                    id="pesquisar"
                    src="./images/pesquisar.png"
                    alt="Imagem para pesquisar"
                  /> */}
                  Pesquisar
                </div>
              </SLink>
            </NavItem>
          </NavList>
        </Navigation>
      );
    } else {
      return (
        <Navigation>
          <NavList className="nav-ul">
            <NavItem className="">
              <SLink className="nav-a" to="/">
                <div>
                  <div className="eye-animation"></div>
                  <Logo className="logo" src="/images/logov.png" alt="go" />
                </div>
              </SLink>
            </NavItem>
            <NavItem>
              <SLink className="nav-a" to="/pesquisar">
                <div>
                  {/* <img
                    id="pesquisar"
                    src="./images/pesquisar.png"
                    alt="Imagem para pesquisar"
                  /> */}
                  Pesquisar
                </div>
              </SLink>
            </NavItem>
            <NavItem>
              <SLink className="nav-a" to="/dashboard">
                <div>
                  {/* <img src="./images/home.png" alt="Imagem para dashboard" /> */}
                  Dashboard
                </div>
              </SLink>
            </NavItem>
            <NavItem>
              <SLink className="nav-a" to="/">
                <div onClick={() => this.logoutUser()}>
                  {/* <img src="./images/user.png" alt="Imagem para logout" /> */}
                  Sair
                </div>
              </SLink>
            </NavItem>
          </NavList>
        </Navigation>
      );
    }
  }
}

export default Navbar;
