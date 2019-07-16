import React from "react";

import "./TextBox.css";
const textBox = props => {
  const p = { ...props.data };

  //Get Height and Width
  const hValue = p.h;
  const wValue = p.w;
  //Get X and Y
  const xValue = (p.x / wValue) * 100;
  const yValue = (p.y / hValue) * 100;

  //Set transform Value
  let transformValue = "translate3d(" + xValue + "%," + yValue + "%,0)";
  if (p.rotate) {
    transformValue += " rotate(" + p.rotate + "deg)";
  }
  if (p.scaleX) {
    transformValue += " scaleX(" + p.scaleX + ")";
  }
  if (p.scaleY) {
    transformValue += " scaleY(" + p.scaleY + ")";
  }

  //Set Transition value
  const transitionValue = p.transition;

  //Set Cursor Style
  let mCursor = "auto";
  if (props.data.onClick) {
    if (props.data.onClick.length > 0) {
      mCursor = "pointer";
    }
  }

  //Combine in Style
  const style = {
    height: hValue + "%",
    width: wValue + "%",
    transform: transformValue,
    fontSize: p.fontSize + "vw",
    transition: transitionValue,
    color: p.color,
    cursor: mCursor
  };

  return (
    <div
      style={style}
      className="TextBox"
      onClick={p.onClick ? () => props.update(p.onClick) : null}
    >
      {p.text}
    </div>
  );
};

export default textBox;
