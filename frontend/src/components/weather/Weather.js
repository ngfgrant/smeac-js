import React from "react";
import api from "../../api/apiService";

class Weather extends React.Component {
  inshoreWeatherForecast = async () => {
    const res = await api.get("weather/");
    return res.data;
  };

  constructor(props) {
    super(props);
    this.state = {
      inshoreWeather: null,
      station: null
    };
  }

  async componentDidMount() {
    const allForecasts = await this.inshoreWeatherForecast();
    this.setState({ inshoreWeather: allForecasts });
    let station;
    if (this.props.station) {
      station = this.state.inshoreWeather.rpt.b.bk.filter(
        station => station.h === this.props.station
      )[0];
    } else {
      station = this.state.inshoreWeather.rpt.b.bk[0];
    }
    this.setState({ station });
  }

  setStation = event => {
    const station = this.state.inshoreWeather.rpt.b.bk.filter(
      station => station.h === event.target.value
    )[0];
    this.setState({ station });
  };

  selectStation = () => {
    return (
      <select onChange={this.setStation} value={this.state.station.h}>
        {this.state.inshoreWeather.rpt.b.bk.map(station => (
          <option key={station.id} value={station.h}>
            {station.h}
          </option>
        ))}
      </select>
    );
  };

  render() {
    let result;

    if (this.state.inshoreWeather !== null && this.state.station !== null) {
      result = (
        <div>
          <div>{this.selectStation()}</div>
          <div key={this.state.station.id}>
            <h3>{this.state.station.h}</h3>
            <p>
              Sea: {this.state.station.f.ss}
              <br />
              Wind: {this.state.station.f.w}
              <br />
              Weather: {this.state.station.f.wt}
              <br />
              Visability: {this.state.station.f.v}
              <br />
            </p>
          </div>
        </div>
      );
    } else {
      result = <p>No weather forecast available.</p>;
    }

    return (
      <div>
        <h1>Weather</h1>
        <div>{result}</div>
      </div>
    );
  }
}

export default Weather;
