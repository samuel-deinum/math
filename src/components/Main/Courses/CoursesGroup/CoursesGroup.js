import React from "react";

import "./CoursesGroup.css";
import Course from "./Course/Course";

const coursesGroup = props => {
  const courses = props.courses.map(e => {
    return <Course key={e.id} data={e} />;
  });

  return (
    <div className="CoursesGroup">
      <div className="Title">
        <span style={{ margin: "auto" }}>{props.title}</span>
      </div>
      <div className="Courses">{courses}</div>
    </div>
  );
};

export default coursesGroup;
