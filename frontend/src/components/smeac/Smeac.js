import React from "react";
import "./Smeac.css";
import Situation from "./Situation";
import Mission from "./Mission";
import Administration from "./Administration";
import Execution from "./Execution";
import Confirm from "./Confirm";

class Smeac extends React.Component {
  render() {
    return (
      <div>
        <Situation />
        <Mission />
        <Administration />
        <Execution />
        <Confirm />
      </div>
    );
  }
}

export default Smeac;
