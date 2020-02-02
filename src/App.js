import React, { Component } from "react";
import "./App.css";

import { BrowserRouter } from "react-router-dom";
import Page from "./Page/Page";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Page />
      </BrowserRouter>
    );
  }
}

export default App;
