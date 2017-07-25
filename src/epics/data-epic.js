import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';
import { actionTypes } from 'constants/action-types';
import { getDataFailure, getDataSuccess } from 'actions';

const url = 'https://data.police.uk/api/crimes-at-location';

const getLocation = location => {
  return new Promise((resolve, reject) => {
    let geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      {
        address: location
      },
      (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
        console.log(results[0].geometry.location); //LatLng
      }
    );
  });
};
const fetchData = (date, location) => {
  /*return fetch('work.json')
        .then(resp => resp.json())
        .then(j => j.work);*/
  return ajax.getJSON(
    `${url}?date=${date}&lat=${location.lat()}&lng=${location.lng()}`
  );
};

export const dataEpic = action$ =>
  action$
    .ofType(actionTypes.GET_DATA)
    .mergeMap(({ payload }) =>
      Observable.fromPromise(getLocation(payload.location)).flatMap(result =>
        Observable.from(fetchData(payload.date, result)).map(getDataSuccess)
      )
    )
    .catch(error => Observable.of(getDataFailure));
