import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config_example";
import hash from "./hash";
import Player from "./Player";
import logo from "./logo.svg";
import Form from "./Form";
import "./App.css";
import Home from "./Home.js"

class App extends Component {
  render() {

    return (
      <div>
        <Home />
      </div>
    )
  }
}
export default App;

