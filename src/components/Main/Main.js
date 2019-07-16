import React, { Component } from "react";

import NavBar from "./NavBar/NavBar";
import Courses from "./Courses/Courses";
import WhiteBoard from "./WhiteBoard/WhiteBoard";

class Main extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavBar />
        {/*
        <div>TODO: Status, Welcome, Adds</div>
        <Courses />
        */}
        <WhiteBoard />
      </React.Fragment>
    );
  }
}

export default Main;
