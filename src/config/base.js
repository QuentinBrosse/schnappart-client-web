import storage from 'redux-persist/lib/storage';
import { inDevEnv } from '../utils/env';

export default {

  // API
  baseApiUrl: 'https://www.schnappart.com/api/',

  // Material UI Theme
  theme: {},

  // Redux Persist
  reduxPersist: {
    key: 'root',
    storage,
    whitelist: ['user'],
    debug: inDevEnv(),
  },

};
