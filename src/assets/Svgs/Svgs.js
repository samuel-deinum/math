import React from "react";

import svgObj from "./svgObj";

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

  //Set Cursor Style
  let mCursor = "auto";
  if (props.data.onClick) {
    if (props.data.onClick.length > 0) {
      mCursor = "pointer";
    }
  }
  const elementStyle = {
    cursor: mCursor
  };

  return (
    <div style={mStyle}>
      <svg
        height="100%"
        width="100%"
        viewBox={
          "0 0 " +
          svgObj[props.data.type]["viewHeight"] *
            svgObj[props.data.type]["ar"] +
          " " +
          svgObj[props.data.type]["viewHeight"]
        }
        style={{ pointerEvent: "auto" }}
      >
        {Object.keys(svgObj[props.data.type]["elements"]).map(Key => {
          let CustomTag = Key.slice(0, Key.length - 1);
          while (/\d/.test(CustomTag)) {
            CustomTag = CustomTag.slice(0, CustomTag.length - 1);
          }
          return (
            <CustomTag
              {...svgObj[props.data.type]["elements"][Key]}
              key={Key}
              onClick={
                props.data.onClick
                  ? () => props.update(props.data.onClick)
                  : null
              }
              style={elementStyle}
            >
              {svgObj[props.data.type]["elements"][Key].text
                ? svgObj[props.data.type]["elements"][Key].text
                : null}
            </CustomTag>
          );
        })}
      </svg>
    </div>
  );
};

export default svgs;
