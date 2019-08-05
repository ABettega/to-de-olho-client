import React, { Component, Fragment } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./pages/MainPage/";
import SignUpForm from "./pages/SignUpForm";
import ResearchPage from "./pages/ResearchPage"
import LoginForm from "./pages/Login"
import { Switch, Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar/>
        <Switch>
          <Route exact path='/' render={() => <Main/>}></Route>
          <Route exact path='/entrar' render={() => <SignUpForm/>}></Route>
          <Route exact path='/pesquisar' render={() => <ResearchPage/>}></Route>
          <Route exact path='/login' render={() => <LoginForm/>}></Route>
        </Switch>
      </Fragment>
    );
  }
}

export default App;
