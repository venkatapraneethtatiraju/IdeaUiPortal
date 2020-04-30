import React, { PureComponent } from "react";
import './App.scss';
import HomePage from './components/HomePage/HomePage';

export default class App extends PureComponent {
    render() {
    return (
      <div className="app-container">
        <HomePage />
      </div>
    );
  }
}
