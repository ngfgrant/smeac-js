import React from "react";
import api from "../../api/apiService";

class Tides extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tides: null, currentDateTime: null };
  }

  tideData = async () => {
    const res = await api.get("/tides?station=" + this.props.tideStation);
    return res.data;
  };

  async componentDidMount() {
    const tides = await this.tideData();
    this.setState({ tides: tides, currentDateTime: new Date().toISOString() });
  }

  getNextTide = tide => {
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

  getTimeDifference = time => {
    let diff = new Date(time).getTime() - new Date().getTime();
    let diffHrs = Math.floor((diff % 86400000) / 3600000);
    let diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);
    return `${diffHrs}:${diffMins}`;
  };

  render() {
    let result;

    if (this.state.tides) {
      let tides = this.state.tides.filter(tide => this.getNextTide(tide));

      tides = tides.sort((a, b) => {
        return new Date(a.DateTime) - new Date(b.DateTime);
      });

      const nextTide = tides[0];

      result = (
        <div key={nextTide.DateTime}>
          <p>
            Next Tide:{new Date(nextTide.DateTime).toLocaleString()}
            <br />
            Tide Tide is: {nextTide.EventType}
            <br />
            Height of Next Tide:{" "}
            {Number.parseFloat(nextTide.Height).toPrecision(3)}
            <br />
            Time To Next Tide: {this.getTimeDifference(nextTide.DateTime)}
          </p>
        </div>
      );
    } else {
      result = "No tidal information available.";
    }

    return (
      <div>
        <h1>Tides</h1>
        {result}
      </div>
    );
  }
}

export default Tides;
