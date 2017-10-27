import React from 'react'

class BenchMap extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // set the map to show SF
    const mapOptions = {
      center: { lat: 37.7758, lng: -122.435 }, // this is SF
      zoom: 13
    };

    // wrap the mapDOMNode in a Google Map
    this.map = new google.maps.Map(this.mapNode, mapOptions);
  }

  render() {
    return (
      <div id='map-container' ref={map => this.mapNode = map}>
      </div>

    )
  }
}

export default BenchMap
