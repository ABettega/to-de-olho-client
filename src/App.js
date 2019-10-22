import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./pages/MainPage/";
import SignUpForm from "./pages/SignUpForm";
import ResearchPage from "./pages/ResearchPage";
import DetailsDeputados from "./pages/DetailsDeputados";
import DetailsSenadores from "./pages/DetailsSenadores";
import LoginForm from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuthService from "./components/Auth/auth-services";
import ProtectedRoute from "./components/Auth/protected-route";
import VotacaoDeputados from "./pages/VotacaoDeputados";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          });
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  }

  getTheUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  render() {
    const sessionVar = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      <Router>
        <div className="pre-nav-mobile"></div>
        <Navbar
          userInSession={this.state.loggedInUser}
          getUser={this.getTheUser}
        />
        <Switch>
          <Route exact path="/" render={props => <Main {...props} />}></Route>
          <Route
            exact
            path="/registrar"
            render={props => (
              <SignUpForm {...props} getUser={this.getTheUser} />
            )}
          ></Route>
          <Route
            exact
            path="/pesquisar"
            render={props => (
              <ResearchPage user={this.state.loggedInUser} {...props} />
            )}
          ></Route>
          <Route
            exact
            path="/login"
            render={props => <LoginForm {...props} getUser={this.getTheUser} />}
          ></Route>
          <Route
            exact
            path="/deputado/votacao/:idVotacao"
            render={props => <VotacaoDeputados {...props} />}
          />
          <Route
            path="/deputado/:id"
            render={props => <DetailsDeputados {...props} />}
          ></Route>
          <Route
            path="/senador/:id"
            render={props => <DetailsSenadores {...props} />}
          ></Route>
          <ProtectedRoute
            path="/dashboard"
            getUser={this.getTheUser}
            user={this.state.loggedInUser}
            component={Dashboard}
          ></ProtectedRoute>
        </Switch>
      </Router>
    );
  }
}

export default App;
