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
      station: null,
      showSelectWeather: false
    };
  }

  updateStation = () => {
    let station;
    if (this.props.station) {
      station = this.state.inshoreWeather.rpt.b.bk.filter(
        station => station.h === this.props.station
      )[0];
    } else {
      station = this.state.inshoreWeather.rpt.b.bk[0];
    }
    this.setState({ station });
  };

  async componentDidMount() {
    const allForecasts = await this.inshoreWeatherForecast();
    this.setState({ inshoreWeather: allForecasts });
    this.updateStation();
    setInterval(async () => {
      let mins = new Date().getMinutes();
      if (mins === 0) {
        const allForecasts = await this.inshoreWeatherForecast();
        this.setState({ inshoreWeather: allForecasts });
        this.updateStation();
      }
    }, 30000);
  }

  setStation = event => {
    const station = this.state.inshoreWeather.rpt.b.bk.filter(
      station => station.h === event.target.value
    )[0];
    this.setState({ station });
  };

  selectStation = () => {
    return (
      <div className="ui form">
        <select onChange={this.setStation} value={this.state.station.h}>
          {this.state.inshoreWeather.rpt.b.bk.map(station => (
            <option key={station.id} value={station.h}>
              {station.h}
            </option>
          ))}
        </select>
      </div>
    );
  };

  render() {
    let result;
    let toggleWeatherListText = "Show Weather Station List";
    if (this.state.showSelectWeather === true) {
      toggleWeatherListText = "Hide Weather Station List";
    }

    if (this.state.inshoreWeather !== null && this.state.station !== null) {
      result = (
        <div>
          <h1>Weather</h1>
          <span
            className="toggle"
            onClick={() => {
              if (this.state.showSelectWeather === false) {
                this.setState({ showSelectWeather: true });
              } else {
                this.setState({ showSelectWeather: false });
              }
            }}
          >
            {toggleWeatherListText}
          </span>
          {this.state.showSelectWeather ? (
            <div>{this.selectStation()}</div>
          ) : (
            <div></div>
          )}

          <div key={this.state.station.id}>
            <h3>{this.state.station.h}</h3>
            <div className="ui list">
              <div className="item">
                <h4>Issued At:</h4>
                {new Date(
                  this.state.inshoreWeather.rpt.iUTC.dUTC
                ).toDateString() +
                  " at " +
                  this.state.inshoreWeather.rpt.iUTC.tUTC +
                  ". Valid until " +
                  new Date(this.state.inshoreWeather.rpt.v.To).toDateString() +
                  " at " +
                  new Date(
                    this.state.inshoreWeather.rpt.v.To
                  ).toLocaleTimeString()}
              </div>

              <div className="item">
                <h4>Sea:</h4> {this.state.station.f.ss}
              </div>
              <div className="item">
                <h4>Wind:</h4> {this.state.station.f.w}
              </div>
              <div className="item">
                <h4>Weather:</h4> {this.state.station.f.wt}
              </div>
              <div className="item">
                <h4>Visability:</h4> {this.state.station.f.v}
              </div>
              <div className="item">
                <h6>
                  Source: {this.state.inshoreWeather.rpt.ca}{" "}
                  {this.state.inshoreWeather.rpt.c}
                </h6>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      result = (
        <div>
          <h1>Weather</h1>
          <p>No weather forecast available.</p>
        </div>
      );
    }

    return (
      <div>
        <div>{result}</div>
      </div>
    );
  }
}

export default Weather;
