import React from "react";

import svgObj from "./svgObj";
import Svg from "./Svg";

const svgs = props => {
  //Get Height and Width
  let heightOrgScale = 1;
  if (props.data.heightOrgScale) {
    heightOrgScale = props.data.heightOrgScale;
  }
  const hValue = svgObj[props.data.type]["height"] * heightOrgScale;
  const wValue =
    (hValue * svgObj[props.data.type]["ar"] * props.ar.h) / props.ar.w;

  //Get X and Y
  const xValue = (props.data.x / wValue) * 100;
  const yValue = (props.data.y / hValue) * 100;

  //Set transform Value
  let transformValue = "translate3d(" + xValue + "%," + yValue + "%,0)";
  if (props.data.rotate) {
    transformValue += " rotate(" + props.data.rotate + "deg)";
  }
  if (props.data.scaleX) {
    transformValue += " scaleX(" + props.data.scaleX + ")";
  }
  if (props.data.scaleY) {
    transformValue += " scaleY(" + props.data.scaleY + ")";
  }

  //Set Transition value
  const transitionValue = props.data.transition;

  //Combine Information in the Style
  const mStyle = {
    position: "absolute",
    height: hValue + "%",
    width: wValue + "%",
    transform: transformValue,
    transition: transitionValue
  };

  return (
    <div style={mStyle}>
      <Svg data={props.data} update={props.update} />
    </div>
  );
};

export default svgs;
