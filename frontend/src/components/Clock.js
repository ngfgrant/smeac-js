import React from "react";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    const timeOptions = {
      timeZone: props.timeZone,
      hour12: false
    };
    this.state = {
      time: new Date().toLocaleTimeString([], timeOptions),
      timeOptions: timeOptions
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  tick() {
    this.setState({
      time: new Date().toLocaleTimeString([], this.state.timeOptions)
    });
  }

  render() {
    return (
      <div>
        <h1 className="ui header">{this.state.time}</h1>
      </div>
    );
  }
}

export default Clock;
