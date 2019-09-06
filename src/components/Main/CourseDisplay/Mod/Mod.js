import React from "react";

import "./Mod.css";

const mod = props => {
  return (
    <div className="Mod">
      <span>{props.title}</span>
      <div className="Img" />
    </div>
  );
};

export default mod;
