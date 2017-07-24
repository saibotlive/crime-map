import { ajax } from "rxjs/observable/dom/ajax";
import { Observable } from "rxjs";
import actionTypes from "constants/action-types";
import { getDataFailure, getDataSuccess } from "actions";

const init = () => {
  /*return fetch('work.json')
        .then(resp => resp.json())
        .then(j => j.work);*/
  return ajax.getJSON("work.json");
};

export const dataEpic = action$ =>
  action$
    .ofType(actionTypes.GET_DATA)
    .mergeMap(() => Observable.from(init()).map(getDataSuccess))
    .catch(error => Observable.of(getDataFailure));
