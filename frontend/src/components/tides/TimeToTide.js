import React from "react";

class TimeToTide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextTide: null,
      timeToNextTide: { hours: 0, minutes: 0 }
    };
  }

  componentDidMount() {
    this.setState({
      nextTide: this.props.nextTide,
      timeToNextTide: { hours: 0, minutes: 0 }
    });
    this.timerID = setInterval(
      () => this.getTimeDifference(this.state.nextTide),
      1000
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.nextTide !== this.props.nextTide) {
      this.setState({ nextTide: this.props.nextTide });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerID);
  }

  getTimeDifference = time => {
    let diff = new Date(time.DateTime).getTime() - new Date().getTime();
    let diffHrs = Math.floor((diff % 86400000) / 3600000);
    let diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);
    this.setState({ timeToNextTide: { hours: diffHrs, minutes: diffMins } });
  };

  render() {
    return (
      <div>
        <h4>Next Tide:</h4> {this.state.timeToNextTide.hours + " hr "}
        {this.state.timeToNextTide.minutes + " min"}
      </div>
    );
  }
}

export default TimeToTide;
