import { combineReducers } from 'redux';
import user from './user';

export const uncombinedRootReducer = {
  user,
};

const makeRootReducer = asyncReducers =>
  combineReducers({
    ...uncombinedRootReducer,
    ...asyncReducers,
  });

export default makeRootReducer;
