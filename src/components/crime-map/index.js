import React from "react";
import { withGoogleMap, GoogleMap } from "react-google-maps";

const CrimeMap = withGoogleMap(props =>
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{
      lat: 0,
      lng: 0
    }}
  />
);

export default CrimeMap;
