import React from "react";
import Situation from "./Situation";
import Mission from "./Mission";
import Administration from "./Administration";
import Execution from "./Execution";
import Confirm from "./Confirm";

class Smeac extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="three wide column">
          <Situation />
          <Mission />
        </div>
        <div className="nine wide column">
          <Administration />
        </div>
        <div className="three wide column">
          <Execution />
          <Confirm />
        </div>
      </div>
    );
  }
}

export default Smeac;
