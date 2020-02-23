import React from "react";
import Clock from "./Clock";
import Smeac from "./smeac/Smeac";
import Weather from "./weather/Weather";
import Tides from "./tides/Tides";
import "../style.css";

class App extends React.Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui three column grid">
          <div className="column"></div>
          <div className="column">
            <h1>UTC</h1>
            <Clock timeZone="UTC" />
          </div>
          <div className="column">
            <h1>Local</h1>
            <Clock timeZone="Europe/London" />
          </div>
        </div>

        <div className="ui three column grid">
          <Smeac />
        </div>

        <div className="ui vertically divided grid">
          <div className="two column row">
            <div className="column">
              <Weather station="Rattray Head to Berwick upon Tweed" />
            </div>
            <div className="column">
              <Tides station="Fidra" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
