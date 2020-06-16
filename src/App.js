import React, { PureComponent } from "react";
import Login from "./components/login/Login";
import { Route } from "react-router";

export default class App extends PureComponent {
  render() {
    return (
      <div className="app-container">
      <Route  path="/" component={Login} />
      </div>
    );
  }
}
