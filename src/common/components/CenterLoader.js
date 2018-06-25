// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

type Props = {
  classes: Object,
};

const CenterLoader = ({ classes }: Props): Node => (
  <div className={classes.root}>
    <CircularProgress />
  </div>
);

CenterLoader.defaultProps = {};

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default withStyles(styles)(CenterLoader);
