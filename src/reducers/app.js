import actionTypes from "constants";

const INITIAL_STATE = {};
export default function appReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case actionTypes.GET_DATA_SUCCESS:
      return {};

    default:
      return state;
  }
}
