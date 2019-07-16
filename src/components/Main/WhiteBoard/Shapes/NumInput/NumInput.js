import React, { Component } from "react";

import "./NumInput.css";

class NumInput extends Component {
  state = {
    value: " ",
    color: "black"
  };

  changeHandler = e => {
    this.setState({ value: e.target.value });
  };

  keyPressHandler = e => {
    if (
      (e.keyCode < 48 || e.keyCode > 57) &&
      e.keyCode !== 190 &&
      e.keyCode !== 189 &&
      e.keyCode !== 8
    ) {
      e.preventDefault();
    }
    if (e.keyCode === 13) {
      this.launchActions();
    }
  };

  launchActions = () => {
    if (this.props.data.onTrue && this.props.data.onFalse) {
      if (parseFloat(this.state.value) === this.props.data.ans) {
        this.props.update(this.props.data.onTrue);
        this.setState({ color: "green" });
      } else {
        this.props.update(this.props.data.onFalse);
        this.setState({ color: "red" });
      }
    } else {
      console.log("Missing onTrue or onFalse Actions");
    }
  };

  render() {
    const p = { ...this.props.data };

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

    //Combine in Style
    const style = {
      height: hValue + "%",
      width: wValue + "%",
      transform: transformValue,
      fontSize: p.fontSize + "vw",
      transition: transitionValue,
      color: this.state.color,
      border: "3px solid " + this.state.color
    };

    const questStyle = {
      border: "1px solid " + this.state.color
    };

    return (
      <div className="NumInput green" style={style}>
        <div className="NumInputQuestion" style={questStyle}>
          {p.question}
        </div>
        <input
          autoFocus={true}
          type="text"
          className="NumInputAnswer"
          value={this.state.value}
          onChange={this.changeHandler}
          onKeyUp={this.keyPressHandler}
        />
      </div>
    );
  }
}

export default NumInput;
