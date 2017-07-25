import React from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
import icon from './gun.svg';

const addInfo = props =>
  <InfoWindow onCloseClick={props.onHideInfo}>
    <div>
      <h2>Crime List</h2>
      {props.data.map(crime =>
        <div className="app__crime" key={crime.id}>
          <p>
            Category: {crime.category}
          </p>
          <p>
            Month: {crime.month}
          </p>
          <p>
            Street: {crime.location.street.name}
          </p>
          <p>
            Outcome: {crime.outcome_status.category}
          </p>
        </div>
      )}
    </div>
  </InfoWindow>;

const addMarker = props =>
  <Marker
    key={props.data[0].id}
    icon={{
      url: icon,
      //path: window.google.maps.SymbolPath.CIRCLE,
      scaledSize: new window.google.maps.Size(60, 60)
    }}
    onClick={props.onMarkerClick}
    position={{
      lat: Number(props.data[0].location.latitude),
      lng: Number(props.data[0].location.longitude)
    }}
  >
    {props.showInfo ? addInfo(props) : null}
  </Marker>;

const CrimeMap = withGoogleMap(props =>
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={8}
    defaultCenter={{
      lat: 55.3781,
      lng: 3.436
    }}
  >
    {props.data.length > 0 ? addMarker(props) : null}
  </GoogleMap>
);

export default CrimeMap;
