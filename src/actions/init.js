import { actionTypes } from 'constants';
import axios from 'axios';

const url = 'https://data.police.uk/api/crimes-at-location';

const getData = () => {
  return {
    type: actionTypes.GET_DATA
  };
};

export const getDataSuccess = payload => {
  return {
    type: actionTypes.GET_DATA_SUCCESS,
    payload
  };
};

export const getDataFailure = payload => {
  return {
    type: actionTypes.GET_DATA_FAILURE,
    payload,
    error: true
  };
};

const getLocation = location => {
  return new Promise((resolve, reject) => {
    let geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      {
        address: location
      },
      (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          resolve(results[0].geometry.location);
        } else {
          console.log('sttt', status);
          reject(status);
        }
      }
    );
  });
};

export const getCrimeData = payload => {
  return dispatch => {
    dispatch(getData());
    getLocation(payload.location)
      .then(
        location =>
          axios.get(
            `${url}?date=${payload.date}&lat=${location.lat()}&lng=${location.lng()}`
          ),
        err => dispatch(getDataFailure(err))
      )
      .then(
        payload => {
          if (!payload.error) dispatch(getDataSuccess(payload));
        },
        err => dispatch(getDataFailure(err.response.statusText))
      );
  };
};
