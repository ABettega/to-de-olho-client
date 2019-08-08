import React, { Component, Fragment } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./pages/MainPage/";
import SignUpForm from "./pages/SignUpForm";
import ResearchPage from "./pages/ResearchPage"
import DetailsDeputados from "./pages/DetailsDeputados"
import Dashboard from "./pages/Dashboard"
import LoginForm from "./pages/Login"
import { Switch, Route } from 'react-router-dom';
import AuthService from './components/Auth/auth-services';
import ProtectedRoute from './components/Auth/protected-route';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }
  
  render() {
    const sessionVar = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      <Fragment>
        <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
        <Switch>
          <Route exact path='/' render={(props) => <Main {...props} />}></Route>
          <Route exact path='/registrar' render={(props) => <SignUpForm {...props} getUser={this.getTheUser} />}></Route>
          <Route exact path='/pesquisar' render={(props) => <ResearchPage {...props} />}></Route>
          <Route exact path='/login' render={(props) => <LoginForm {...props} getUser={this.getTheUser} />}></Route>
          <Route path='/deputado/:id' render={(props) => <DetailsDeputados {...props} />}></Route>
          <ProtectedRoute path='/dashboard' getUser={this.getTheUser} user={this.state.loggedInUser} component={Dashboard}></ProtectedRoute>
        </Switch>
      </Fragment>
    );
  }
}

export default App;
