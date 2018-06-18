// @flow

import React from 'react';
import type { Node } from 'react';
import { Provider } from 'react-redux';
import getStore from '../../utils/getStore';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import config from '../../config';
import MainRooter from './MainRooter';

const store = getStore();
const theme = createMuiTheme(config.theme);

const Root = (): Node => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <MainRooter />
    </MuiThemeProvider>
  </Provider>
);
Root.defaultProps = {};


export default Root;
