import React from "react";
import svgObj from "./svgObj";

const Svg = props => {
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
    <svg
      height="100%"
      width="100%"
      viewBox={
        "0 0 " +
        svgObj[props.data.type]["viewHeight"] * svgObj[props.data.type]["ar"] +
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
            fill={
              props.data.color
                ? props.data.color
                : svgObj[props.data.type]["elements"][Key]["fill"]
            }
            key={Key}
            onClick={
              props.data.onClick ? () => props.update(props.data.onClick) : null
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
  );
};

export default Svg;
