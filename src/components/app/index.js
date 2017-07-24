import React, { Component } from "react";
import CrimeMap from "components/crime-map";
import "./style.scss";
class App extends Component {
  handleMapLoad = map => {
    this._mapComponent = map;
    console.log("loaded");
  };

  render() {
    return (
      <div className="app">
        <CrimeMap
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          onMapLoad={this.handleMapLoad}
        />
      </div>
    );
  }
}

export default App;
