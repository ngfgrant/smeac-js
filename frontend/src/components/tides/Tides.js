import React from "react";
import api from "../../api/apiService";
import TimeToTide from "./TimeToTide";

class Tides extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tides: null,
      nextTide: null,
      station: null,
      stations: null,
      showSelectTide: false
    };
  }

  tideData = async stationName => {
    const res = await api.get("/tides?station=" + stationName);
    return res.data;
  };

  stationData = async () => {
    const res = await api.get("/tides/stations");
    return res.data;
  };

  async componentDidMount() {
    const stations = await this.stationData();
    this.setState({ stations: stations });

    if (!this.state.station && this.props.station) {
      let station = this.state.stations.filter(
        station => station.properties.Name === this.props.station
      )[0];
      this.setState({ station: station });
    } else {
      let station = this.state.stations[0];
      this.setState({ station: station });
    }

    const tides = await this.tideData(this.state.station.properties.Name);
    this.setState({ tides: tides });
    const nextTide = this.getNextTide();
    this.setState({ nextTide });

    setInterval(() => {
      this.getNextTide();
    }, 1000);
  }

  getNextTide = () => {
    if (this.state.tides && this.state.station) {
      let tides = this.state.tides.filter(tide => this.filterFutureTides(tide));
      tides = tides.sort((a, b) => {
        return new Date(a.DateTime) - new Date(b.DateTime);
      });
      this.setState({ nextTide: tides[0] });
      return tides[0];
    }
  };

  filterFutureTides = tide => {
    let now = new Date();
    let dateTimeTide = new Date(tide.DateTime);
    if (
      dateTimeTide.getDate() === now.getDate() ||
      dateTimeTide.getDate() === now.getDate() + 1
    ) {
      if (dateTimeTide.getTime() >= now.getTime()) {
        return tide;
      }
    }
  };

  setStation = async event => {
    const station = this.state.stations.filter(
      station => station.properties.Name === event.target.value
    )[0];
    this.setState({ station });
    const tides = await this.tideData(station.properties.Name);
    this.setState({ tides: tides });
    const nextTide = this.getNextTide();
    this.setState({ nextTide });
  };

  selectStation = () => {
    return (
      <div
        className="ui form"
        style={{ display: "inline-block", marginLeft: "10px" }}
      >
        <select
          onChange={this.setStation}
          value={this.state.station.properties.Name}
        >
          {this.state.stations.map(station => (
            <option key={station.properties.Id} value={station.properties.Name}>
              {station.properties.Name}
            </option>
          ))}
        </select>
      </div>
    );
  };

  heightOfNextTide = () => {
    if (this.state.nextTide.Height) {
      return (
        <div>
          {Number.parseFloat(this.state.nextTide.Height).toPrecision(3)} meters
        </div>
      );
    } else {
      return <div>No tidal height information</div>;
    }
  };

  render() {
    let result;
    let toggleTideListText = "Show Tide Station List";
    if (this.state.showSelectTide === true) {
      toggleTideListText = "Hide Tide Station List";
    }
    if (this.state.tides && this.state.nextTide) {
      let nextTide = this.state.nextTide;
      result = (
        <div>
          <h1>Tide</h1>
          <span
            className="toggle"
            onClick={() => {
              if (this.state.showSelectTide === false) {
                this.setState({ showSelectTide: true });
              } else {
                this.setState({ showSelectTide: false });
              }
            }}
          >
            {toggleTideListText}
          </span>
          {this.state.showSelectTide ? (
            <div>{this.selectStation()}</div>
          ) : (
            <div></div>
          )}

          <div className="ui list" key={nextTide.DateTime}>
            <h3>Station: {this.state.station.properties.Name}</h3>
            <div className="item">
              <h4>Next Tide:</h4> {new Date(nextTide.DateTime).toLocaleString()}
              {" (" + nextTide.EventType + ")"}
            </div>
            <div className="item">
              <TimeToTide nextTide={nextTide} />
            </div>
            <div className="item">
              <h4>Tide is:</h4>
              {nextTide.EventType === "HighWater" ? "Flooding" : "Ebbing"}
            </div>
            <div className="item">
              <h4>Height of Next Tide:</h4> {this.heightOfNextTide()}
            </div>
          </div>
        </div>
      );
    } else {
      result = <div>No tidal information available.</div>;
    }

    return <div>{result}</div>;
  }
}

export default Tides;
