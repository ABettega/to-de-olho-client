import React, { Component, Fragment } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import { Switch, Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Switch>
          <Route exact path='/' render={(props) => <Main {...props}/>}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
