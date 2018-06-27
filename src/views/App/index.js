// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import NavBar from './NavBar';
import Manage from '../Manage';
import Inbox from '../Inbox';
import GlobalFetches from './GlobalFetches';


type Props = {
  classes: Object,
};

const LogIn = ({ classes }: Props): Node => (
  <Router basename="/app">
    <div className={classes.root}>
      <NavBar />
      <GlobalFetches />
      <div className={classes.container}>
        <Switch>
          <Route exact path="/" component={Manage} />
          <Route exact path="/inbox" component={Inbox} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  </Router>
);

LogIn.defaultProps = {};

const styles = ({ spacing }) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    padding: spacing.unit * 2,
    paddingTop: spacing.unit * 4,
  },
});

export default withStyles(styles)(LogIn);
