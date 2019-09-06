import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./CourseDisplay.css";
import Mod from "./Mod/Mod";

class CourseDiplay extends Component {
  state = {
    info: {
      color: "#727CFC",
      title: "Algebra",
      moduleGroups: [
        {
          id: 1,
          title: "Exponents",
          modules: [
            {
              id: 1,
              title: "What is an exponent?",
              link: "what-is-an-exponent"
            },
            {
              id: 2,
              title: "Multiplying Exponents",
              link: "multiplying-exponents"
            },
            ,
            {
              id: 3,
              title: "Dividing Exponents",
              link: "Dividing Exponents"
            }
          ]
        },
        {
          id: 2,
          title: "Algebra",
          modules: [{ id: 1, title: "Variables", link: "variables" }]
        }
      ]
    }
  };
  componentDidMount = () => {
    console.log(this.props.match.params.courseId);
    console.log(this.props.location.pathname);
  };
  render() {
    const moduleGroups = this.state.info.moduleGroups.map(mg => {
      return (
        <div className="ModuleGroup" key={mg.id}>
          <div className="ModuleGroupLeft">
            <span>{mg.title}</span>
          </div>
          <div className="ModuleGroupRight">
            {mg.modules.map(m => {
              return (
                <div className="Module" key={m.id}>
                  <Link to={this.props.location.pathname + "/" + m.link}>
                    <Mod title={m.title} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      );
    });

    return (
      <div
        className="CourseDisplay"
        style={{ background: this.state.info.color }}
      >
        <div className="CourseTitle">{this.state.info.title}</div>
        {moduleGroups}
      </div>
    );
  }
}

export default CourseDiplay;
