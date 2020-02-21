import React from "react";
import api from "../../api/apiService";
import TimeToTide from "./TimeToTide";

class Tides extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tides: null, nextTide: null };
  }

  tideData = async () => {
    const res = await api.get("/tides?station=" + this.props.tideStation);
    return res.data;
  };

  async componentDidMount() {
    const tides = await this.tideData();
    this.setState({ tides: tides });
    this.setNextTide();
    setInterval(() => {
      this.setNextTide();
    }, 60000);
  }

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

  setNextTide = () => {
    if (this.state.tides) {
      let tides = this.state.tides.filter(tide => this.filterFutureTides(tide));
      tides = tides.sort((a, b) => {
        return new Date(a.DateTime) - new Date(b.DateTime);
      });
      this.setState({ nextTide: tides[0] });
    }
  };

  render() {
    let result;
    if (this.state.tides && this.state.nextTide) {
      let nextTide = this.state.nextTide;
      result = (
        <div key={nextTide.DateTime}>
          Next Tide: {new Date(nextTide.DateTime).toLocaleString()}
          {" (" + nextTide.EventType + ")"}
          <br />
          <TimeToTide nextTide={nextTide} />
          Tide is: {nextTide.EventType === "HighWater" ? "Flooding" : "Ebbing"}
          <br />
          Height of Next Tide:{" "}
          {Number.parseFloat(nextTide.Height).toPrecision(3)} meters
        </div>
      );
    } else {
      result = "No tidal information available.";
    }

    return (
      <div>
        <h1>Tide</h1>
        {result}
      </div>
    );
  }
}

export default Tides;
