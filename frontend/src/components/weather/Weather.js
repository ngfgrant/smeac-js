import React from "react";
import api from "../../api/apiService";

class Weather extends React.Component {
  inshoreWeatherForecast = async () => {
    const res = await api.get("weather/");
    return res.data;
  };

  constructor(props) {
    super(props);
    this.state = { inshoreWeather: null };
  }

  async componentDidMount() {
    const forecast = await this.inshoreWeatherForecast();
    this.setState({ inshoreWeather: forecast });
  }

  render() {
    let result;

    if (this.state.inshoreWeather) {
      const station = this.state.inshoreWeather.rpt.b.bk.filter(
        station => station.h === this.props.inshoreStation
      )[0];

      result = (
        <div key={station.id}>
          <h3>{station.h}</h3>
          <p>
            Sea: {station.f.ss}
            <br />
            Wind: {station.f.w}
            <br />
            Weather: {station.f.wt}
            <br />
            Visability: {station.f.v}
            <br />
          </p>
        </div>
      );
    } else {
      result = "No weather forecast available.";
    }

    return (
      <div>
        <h1>Weather</h1>
        {result}
      </div>
    );
  }
}

export default Weather;
