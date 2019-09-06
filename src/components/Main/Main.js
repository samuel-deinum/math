import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "./NavBar/NavBar";
import Courses from "./Courses/Courses";
import WhiteBoard from "./WhiteBoard/WhiteBoard";
import CourseDisplay from "./CourseDisplay/CourseDisplay";
import "./Main.css";

class Main extends Component {
  state = {};
  render() {
    return (
      <div className="Main">
        <NavBar />
        <Switch>
          <Route exact path="/" component={WhiteBoard}></Route>
          <Route exact path="/courses" component={Courses} />
          <Route exact path="/courses/:courseId" component={CourseDisplay} />
          <Route
            exact
            path="/courses/:courseId/:moduleId"
            component={WhiteBoard}
          />
        </Switch>
      </div>
    );
  }
}

export default Main;
