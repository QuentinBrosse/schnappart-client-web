import { combineReducers } from 'redux';
// import groups from './groups';

const makeRootReducer = asyncReducers =>
  combineReducers({
    // groups, 
    ...asyncReducers,
  });

export default makeRootReducer;
