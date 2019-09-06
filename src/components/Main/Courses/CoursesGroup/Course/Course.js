import React from "react";

import { Link } from "react-router-dom";
import "./Course.css";

const course = props => {
  return (
    <Link to={"courses/" + props.data.link}>
      <div className="Course">
        <div className="CourseTitle">{props.data.title}</div>
      </div>
    </Link>
  );
};

export default course;
