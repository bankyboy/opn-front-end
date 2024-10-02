import { combineReducers } from 'redux';
import donationReducer from '../redux/donation/donationSlice';

const rootReducers = combineReducers({
  donation: donationReducer,
});

export default rootReducers;
