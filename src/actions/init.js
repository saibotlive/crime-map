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
          reject(status);
        }
      }
    );
  });
};

export const getCrimeData =  payload => {
  return async dispatch => {
    dispatch(getData());
    const location = await getLocation(payload.location)
    const resp = await axios.get(
      `${url}?date=${payload.date}&lat=${location.lat()}&lng=${location.lng()}`
    )

    if (!resp.error) dispatch(getDataSuccess(resp));
  };
};
