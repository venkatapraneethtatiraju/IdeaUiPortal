import React, { PureComponent } from "react";
import Login from "./components/login/Login";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard";
import HomePage from "./components/HomePage/HomePage";

export default function App()  {
  
    return (
      <div className="app-container">
      <Route  path='/' component={Login} />
      </div>
    );
  }

