import { connect } from 'react-redux';
import { getCrimeData } from '../actions';
import { getDataState, getMsgState } from '../selectors';
import App from '../components/App';

function mapStateToProps(state) {
  return {
    data: getDataState(state),
    msg: getMsgState(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCrimeData(payload) {
      dispatch(getCrimeData(payload));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
