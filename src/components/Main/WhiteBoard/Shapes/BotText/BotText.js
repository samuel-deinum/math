import React, { Component } from "react";

import "./BotText.css";
import Svgs from "../../../../../assets/Svgs/Svgs";

class BotText extends Component {
  state = {
    text: "",
    prevText: "",
    firstLineComplete: false,
    botHeight: 30
  };

  componentDidMount = () => {
    this.animate();
  };

  componentWillReceiveProps = nextProps => {
    if (
      this.state.firstLineComplete &&
      this.state.text !== nextProps.data.text
    ) {
      this.animate();
    }
  };

  animate = text => {
    //Reset Text
    this.setState({ text: "" });

    const currentText = this.props.data.text;
    //Grab and Set Time
    let time = 1000 / 15;
    if (this.props.data.time) {
      time = (this.props.data.time * 1000) / currentText.length;
    }
    //Loop Through Text
    let i = 0;
    const interval = setInterval(() => {
      if (i >= currentText.length) {
        clearInterval(interval);
        this.setState({ firstLineComplete: true, botHeight: 30 });
        if (this.props.data.onComplete) {
          this.props.update(this.props.data.onComplete);
        }
      } else {
        if (currentText !== this.props.data.text) {
          clearInterval(interval);
        } else {
          let mBotHeight = this.state.botHeight;
          if (i % 8 === 0) {
            mBotHeight = 27;
          } else if (i % 4 === 0) {
            mBotHeight = 33;
          }
          let mText = this.state.text;
          mText += currentText.charAt(i);
          this.setState({ text: mText, botHeight: mBotHeight });
          i++;
        }
      }
    }, time);
  };

  render() {
    const p = { ...this.props.data };

    //Get Height and Width
    const hValue = p.h;
    const wValue = (((p.h * 4) / 3) * this.props.ar.h) / this.props.ar.w;
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
    if (this.props.data.onClick) {
      if (this.props.data.onClick.length > 0) {
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

    //Svgs Data
    const data = {
      type: "bot",
      x: 45,
      y: this.state.botHeight,
      scaleX: 12,
      scaleY: 12,
      rotate: 0,
      transition: "transform 0.5s"
    };

    return (
      <div
        className={p.side ? "BotTextSide" : "BotText"}
        style={style}
        onClick={
          this.props.data.onClick
            ? () => this.props.update(this.props.data.onClick)
            : null
        }
      >
        <div className={p.side ? "BotTextSpeechSide" : "BotTextSpeech"}>
          <span>{this.state.text}</span>
        </div>
        <div className={p.side ? "BotTextBotSide" : "BotTextBot"}>
          <Svgs ar={{ w: 1, h: 1 }} data={data} />
        </div>
      </div>
    );
  }
}

export default BotText;
