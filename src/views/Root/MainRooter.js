// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { PrivateRoute } from '../../common/containers';
import App from '../App';
import LogIn from '../LogIn';
import CircularProgress from '@material-ui/core/CircularProgress';

type Props = {
  classes: Object,
  auth: Object,
};

const MainRooter = ({ classes, auth }: Props): Node => {

  const loading = false;

  if (loading) {
    return (
      <div className={classes.globalProgress}>
        <CircularProgress size={50} />
      </div>
    );
  }
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/app" component={App} />
        <Route exact path="/login" component={LogIn} />
        <Redirect to="/app" />
      </Switch>
    </Router>
  );
};

MainRooter.defaultProps = {};

const styles = {
  globalProgress: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

// const mapStateToProps = ({ firebase: { auth } }) => ({
//   auth,
// });

export default compose(
  withStyles(styles),
  // connect(mapStateToProps)
)(MainRooter);
