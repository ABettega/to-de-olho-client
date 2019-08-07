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

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar/>
        <Switch>
          <Route exact path='/' render={() => <Main/>}></Route>
          <Route exact path='/signup' render={(props) => <SignUpForm {...props} />}></Route>
          <Route exact path='/pesquisar' render={(props) => <ResearchPage {...props} />}></Route>
          <Route exact path='/login' render={(props) => <LoginForm {...props} />}></Route>
          <Route path='/deputado/:id' render={(props) => <DetailsDeputados {...props} />}></Route>
          <Route path='/dashboard/' render={() => <Dashboard/>}></Route>
        </Switch>
      </Fragment>
    );
  }
}

export default App;
