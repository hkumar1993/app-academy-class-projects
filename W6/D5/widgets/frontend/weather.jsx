import React from 'react';

class Weather extends React.Component{
  constructor(props) {
    super(props);
    // this.state.weatherStatus = 'pending';
    this.state = {weatherStatus: 'pending', weatherResponse: {}};
    this.renderWeather = this.renderWeather.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      this.getWeather(lat, long);
      // console.log('position',position);
      // console.log('lat',position.coords.latitude);
      // console.log('long',position.coords.longitude);
    });
  }

  getWeather(lat, lon) {
    const xhr = new XMLHttpRequest();
    const apiKey = "78a572be1de9d2176ab650a30a307bb0";
    const data = {lat, lon, APPID: apiKey};
    let url = 'http://api.openweathermap.org/data/2.5/weather?';
    url += `lat=${data.lat}&`;
    url += `lon=${data.lon}&`;
    url += `APPID=${apiKey}`;
    xhr.open('GET', url);
    xhr.onload = () => {
      this.setState({
        weatherStatus: 'loaded',
        weatherResponse: JSON.parse(xhr.response)
      });
    };
    xhr.send();
  }

  renderWeather() {
    if (this.state.weatherStatus === 'pending') {
      return (
        <p>
          <span>Loading Weather...</span>
        </p>
      );
    } else {
      const city = this.state.weatherResponse.name;
      const tempK = this.state.weatherResponse.main.temp;
      const tempF = (tempK * 9/5) - 459.67;
      return (
        <p>
          <span>{city}: </span>
          <span>{tempF.toFixed(1)} ℉</span>
        </p>
      );
    }
  }

  render() {
    return (
      <div>
        <h1>Weather</h1>
        <div className="weather">
          { this.renderWeather() }
        </div>
      </div>

    );
  }
}

export default Weather;
