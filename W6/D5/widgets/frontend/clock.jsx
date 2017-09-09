import React from 'react';

class Clock extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      time: new Date()
    };

  }

  componentDidMount() {
    this.intervalId = setInterval(this.tick.bind(this), 1000);
    console.log(this.intervalId);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
    this.intervalId = 0;
  }


  tick() {
    this.setState({
      time: new Date()
    });
  }

  render() {
    let time = this.state.time;
    let timeString = time.toLocaleTimeString();
    let dateString = time.toDateString();

    return (
      <div>
        <h1>Clock</h1>
        <div className="clock">
          <p>
            <span>Time:</span>
            <span>{timeString}</span>
          </p>
          <p>
            <span>Date:</span>
            <span>{dateString}</span>
          </p>
        </div>
      </div>
    );
  }
}

export default Clock;
