import React from "react";

import "./Course.css";
import wood from "../../../../assets/images/wood.jpg";

const course = props => {
  return (
    <div className="Course">
      <img src={wood} alt="wood" />
      <div className="CourseTitle">{props.title}</div>
    </div>
  );
};

export default course;
