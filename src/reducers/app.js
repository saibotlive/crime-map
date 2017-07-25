import { actionTypes } from 'constants';

const INITIAL_STATE = { data: [], msg: '' };
export default function appReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case actionTypes.GET_DATA:
      return {
        ...state,
        msg: 'Fetching Data...'
      };

    case actionTypes.GET_DATA_SUCCESS:
      return {
        ...state,
        data: payload.data,
        msg: ''
      };

    case actionTypes.GET_DATA_FAILURE:
      return {
        ...state,
        msg: payload,
        data: []
      };

    default:
      return state;
  }
}
