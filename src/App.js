import React, { PureComponent } from "react";
import Login from "./components/login/Login";

export default class App extends PureComponent {
  render() {
    return (
      <div className="app-container">
        <Login />
      </div>
    );
  }
}
