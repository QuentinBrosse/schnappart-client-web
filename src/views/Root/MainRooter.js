// @flow

import React from 'react';
import type { Node } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { PrivateRoute } from '../../common/containers';
import App from '../App';
import LogIn from '../LogIn';


const MainRooter = (): Node => (
  <Router>
    <Switch>
      <PrivateRoute path="/app" component={App} />
      <Route exact path="/login" component={LogIn} />
      <Redirect to="/app" />
    </Switch>
  </Router>
);

MainRooter.defaultProps = {};

export default MainRooter;
