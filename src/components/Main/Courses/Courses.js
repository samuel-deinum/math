import React, { Component } from "react";

import "./Courses.css";
import CoursesGroup from "./CoursesGroup/CoursesGroup";

class Courses extends Component {
  state = {
    groups: [
      {
        id: 1,
        title: "Basics",
        courses: [
          { id: 11, link: "addition", title: "Addition" },
          { id: 12, link: "subtraction", title: "Subtraction" },
          { id: 13, link: "multiplication", title: "Multiplication" },
          { id: 14, link: "division", title: "Division" }
        ]
      },
      {
        id: 2,
        title: "Grade 9",
        courses: [
          {
            id: 21,
            link: "numbersense-algebra",
            title: "NumberSense and Algebra"
          },
          { id: 22, link: "linear-relations", title: "Linear Relations" },
          { id: 23, link: "analytic-geometry", title: "Analytic Geometry" },
          {
            id: 24,
            link: "measurement-and-geometry",
            title: "Measurement and Geometry"
          }
        ]
      }
    ]
  };
  render() {
    const groups = this.state.groups.map(e => {
      return <CoursesGroup key={e.id} title={e.title} courses={e.courses} />;
    });

    return (
      <React.Fragment>
        <h1>Courses</h1>
        {groups}
      </React.Fragment>
    );
  }
}

export default Courses;
