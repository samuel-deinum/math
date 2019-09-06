import React, { Component } from "react";

import "./WhiteBoard.css";
import Shapes from "./Shapes/Shapes";
import testScenesArr from "./testScenesArr";
import introExp from "./introExp";

class WhiteBoard extends Component {
  state = {
    ar: { w: 16, h: 9 },
    shapes: [],
    scenes: testScenesArr,
    sceneIndex: -1,
    wbActions: [],
    multi: {}
  };

  componentDidMount = () => {
    this.update([{ type: "NEXT_SCENE" }]);
  };

  update = actions => {
    //Grab Current Shapes
    let mShapes = [...this.state.shapes];

    //Loop through actions
    actions.forEach(a => {
      //Act on Action
      switch (a.type) {
        case "ADD":
          //Create New Shape
          const shape = {
            ...a.info
          };
          mShapes.push(shape);
          //Set onComplete for After the the Addition
          if (a.onComplete) {
            setTimeout(() => {
              this.update(a.onComplete);
            }, 50);
          }
          //Update State
          this.setState({ shapes: mShapes });
          break;
        case "CHANGE":
          //Find Target
          let i = this.findTarget(mShapes, a.target);
          if (i === null) {
            break;
          }
          //Each key in changes are changed in the shape
          const keys = Object.keys(a.changes);
          keys.forEach(k => {
            mShapes[i][k] = a.changes[k];
          });
          //Set transition
          let transitionValue = "transform";
          transitionValue += " " + a.time + "s";
          if (a.cb) {
            transitionValue += " " + a.cb;
          }
          mShapes[i].transition = transitionValue;
          //Set onComplete Action
          if (a.onComplete) {
            setTimeout(() => {
              this.update(a.onComplete);
            }, a.time * 1000);
          }
          //Update State
          this.setState({ shapes: mShapes });
          break;
        case "DELETE":
          //Find Target
          let j = this.findTarget(mShapes, a.target);
          if (j === null) {
            break;
          }
          mShapes.splice(j, 1);
          //Update State
          this.setState({ shapes: mShapes });
          break;
        case "DELETE_ALL":
          mShapes = [];
          //Update State
          this.setState({ shapes: mShapes });
          break;
        case "CHANGE_ALL":
          //Single Change for Shape
          for (let i = 0; i < mShapes.length; i++) {
            let newChange = {
              type: "CHANGE",
              target: mShapes[i].id,
              time: a.time,
              changes: a.changes
            };
            this.update([newChange]);
          }
          //Set onComplete Action
          if (a.onComplete) {
            setTimeout(() => {
              this.update(a.onComplete);
            }, a.time * 1000);
          }
          break;
        case "NEXT_SCENE":
          //Delete All Shapes
          mShapes = [];
          //Update State with Deleted Shapes
          this.setState({ shapes: mShapes, wbActions: [] });
          //Grap and Update Index
          let index = this.state.sceneIndex;
          index++;
          this.setState({ sceneIndex: index });

          //Add new Shapes from Next Scene
          if (index < this.state.scenes.length) {
            setTimeout(() => {
              this.update(this.state.scenes[index], 1000);
            });
          }
          break;
        case "MULTI":
          //Grab multi Object
          let mMulti = { ...this.state.multi };
          if (a.id in mMulti) {
            //Reduce num
            mMulti[a.id].num--;
            //Add Actions
            if (!mMulti[a.id].actions && a.actions) {
              mMulti[a.id].actions = a.actions;
            }
            //Launch Actions
            if (mMulti[a.id].num === 0) {
              this.update(mMulti[a.id].actions);
              mMulti[a.id] = null;
            }
          } else {
            //Reduce num
            a.num--;
            //Copy action to multi
            mMulti[a.id] = a;
          }
          this.setState({ multi: mMulti });
          break;
        case "WB_ACTIONS":
          this.setState({ wbActions: [...a.actions] });
          break;
        default:
          console.log("NOT A CORRECT ACTION");
          break;
      }
    });
  };

  findTarget = (mShapes, target) => {
    let i = 0;
    if (target >= 0) {
      while (i < mShapes.length && mShapes[i].id !== target) {
        i++;
      }
    } else {
      i = mShapes.length + target;
    }
    if (i === mShapes.length) {
      i = null;
      console.log("TARGET NOT FOUND");
    }
    return i;
  };

  render() {
    //White Board Cursor
    let mCursor = "auto";
    if (this.state.wbActions.length > 0) {
      mCursor = "pointer";
    }
    //Implement WhiteBoard Dimentions
    const style = {
      width: "85vw",
      height: (85 * this.state.ar.h) / this.state.ar.w + "vw",
      maxHeight: "85vh",
      maxWidth: (85 * this.state.ar.w) / this.state.ar.h + "vh",
      cursor: mCursor
    };
    return (
      <div
        className="WhiteBoard"
        id="wb"
        style={style}
        onClick={() => this.update(this.state.wbActions)}
      >
        <Shapes
          shapes={this.state.shapes}
          ar={this.state.ar}
          update={this.update}
        />
      </div>
    );
  }
}

export default WhiteBoard;
