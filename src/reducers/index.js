import { combineReducers } from 'redux';
import user from './user';
import feature from './feature';

export const uncombinedRootReducer = {
  user,
  feature,
};

const makeRootReducer = asyncReducers =>
  combineReducers({
    ...uncombinedRootReducer,
    ...asyncReducers,
  });

export default makeRootReducer;
