
import { combineReducers } from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  userDetails: userReducer,
});

export default rootReducer;