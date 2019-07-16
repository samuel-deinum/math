import React from "react";

import Svgs from "../../../../assets/Svgs/Svgs";
import NumInput from "./NumInput/NumInput";
import TextBox from "./TextBox/TextBox";
import Game from "./Game/Game";
import BotText from "./BotText/BotText";

const shapes = props => {
  const components = {
    Svgs: Svgs,
    NumInput: NumInput,
    TextBox: TextBox,
    Game: Game,
    BotText: BotText
  };

  const shapes = props.shapes.map(s => {
    //Get Correct Component
    const Component = components[s.component];
    //Return Shape
    return (
      <Component key={s.id} update={props.update} data={s} ar={props.ar} />
    );
  });

  return <React.Fragment>{shapes}</React.Fragment>;
};

export default shapes;
