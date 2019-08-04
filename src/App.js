import React, { Component, Fragment } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/MainPage/";
import SignUpForm from "./components/SignUpForm";
import { Switch, Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar/>
        <Switch>
          <Route exact path='/' render={() => <Main/>}></Route>
          <Route exact path='/signup' render={() => <SignUpForm/>}></Route>
        </Switch>
      </Fragment>
    );
  }
}

export default App;
