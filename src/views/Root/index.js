// @flow

import React from 'react';
import type { Node } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import getStore from '../../utils/getStore';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import config from '../../config';
import MainRooter from './MainRooter';

const { store, persistor } = getStore();
const theme = createMuiTheme(config.theme);

const Root = (): Node => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <MuiThemeProvider theme={theme}>
        <MainRooter />
      </MuiThemeProvider>
    </PersistGate>
  </Provider>
);
Root.defaultProps = {};


export default Root;
