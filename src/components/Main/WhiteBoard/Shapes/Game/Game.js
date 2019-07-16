import React, { Component } from "react";

import "./Game.css";
import Snake from "./Snake";
import Alien from "./Alien";
import Train from "./Train";
import FlappyBird from "./FlappyBird";

class Game extends Component {
  state = {
    ar: { snake: 1, alien: 4 / 6, train: 6 / 4, flappyBird: 6 / 4 }
  };

  componentDidMount = () => {
    //Set up Game Directory
    const game = {
      snake: Snake,
      alien: Alien,
      train: Train,
      flappyBird: FlappyBird
    };
    //Grap canv and activated game class on it
    const canv = document.getElementById("gc");
    new game[this.props.data.type](canv, this.props.data.operator, {
      activated: false,
      method: this.finish
    });
  };

  finish = () => {
    if (this.props.data.onFinish) {
      this.props.update(this.props.data.onFinish);
    }
  };

  render() {
    //Get Data
    const p = this.props.data;
    //Get Height and Width
    const hValue = p.h;
    const wValue =
      (hValue * this.state.ar[p.type] * this.props.ar.h) / this.props.ar.w;
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
      transition: transitionValue,
      background: "green"
    };

    return (
      <div className="Game" style={style}>
        <canvas id="gc" />
      </div>
    );
  }
}

export default Game;
