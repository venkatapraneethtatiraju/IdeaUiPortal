import React, { PureComponent } from "react";
//import './App.scss';
import HomePage from './components/HomePage/HomePage';
import Login from "./components/login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

export default class App extends PureComponent {
    render() {
    return (
      <div className="app-container">
          <Login/>
      </div>
    );
  }
}
