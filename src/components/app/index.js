import React, { Component } from 'react';
import CrimeMap from '../crime-map';
import './style.css';
class App extends Component {
  constructor() {
    super();
    this.date = '';
    this.location = '';
    this.state = {
      showInfo: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (data.length > 0) this.gotoPosition(data);
  }

  gotoPosition = data => {
    let latLng = new window.google.maps.LatLng(
      Number(data[0].location.latitude),
      Number(data[0].location.longitude)
    );
    this._mapComponent.panTo(latLng);
  };

  handleMapLoad = map => {
    this._mapComponent = map;
  };

  showInfo = () => {
    this.setState({
      showInfo: true
    });
  };

  hideInfo = () => {
    this.setState({
      showInfo: false
    });
  };

  handleMarkerClick = e => {
    this.showInfo();
  };

  handleSubmit = e => {
    e.preventDefault();
    const { getCrimeData } = this.props;
    const { date, location } = this;
    getCrimeData({ date, location });
  };

  handleChange = e => {
    this[e.target.name] = e.target.value;
  };

  render() {
    const { data, msg } = this.props;
    return (
      <div className="app">
        <div className="app__header">
          <h1>UK CRIME MAP</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              name="location"
              onChange={this.handleChange}
              type="text"
              placeholder="Location"
            />
            <input
              onChange={this.handleChange}
              name="date"
              placeholder="YYYY-MM"
            />
            <input type="submit" value="Submit" />
          </form>
          <p>
            {msg}
          </p>
        </div>
        <CrimeMap
          containerElement={<div className="app__mapContainer" />}
          mapElement={<div className="app__map" />}
          onMapLoad={this.handleMapLoad}
          onMarkerClick={this.handleMarkerClick}
          showInfo={this.state.showInfo}
          onHideInfo={this.hideInfo}
          data={data}
        />
      </div>
    );
  }
}

export default App;
