import React, { Component } from "react";

import "./Courses.css";
import Course from "./Course/Course";

class Courses extends Component {
  state = {
    courses: [
      { id: 1, title: "Addition" },
      { id: 2, title: "Subtraction" },
      { id: 3, title: "Multiplication" },
      { id: 4, title: "Division" }
    ]
  };
  render() {
    const courses = this.state.courses.map(e => {
      return <Course key={e.id} title={e.title} img={e.img} />;
    });

    return <div className="Courses">{courses}</div>;
  }
}

export default Courses;
