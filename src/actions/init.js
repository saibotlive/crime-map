import actionTypes from "constants";

export const getData = () => {
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
