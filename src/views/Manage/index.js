// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from '@material-ui/core/styles';

type Props = {
  classes: Object,
};

const Manage = ({ classes }: Props): Node => (
  <div className={classes.root}>
    Manage
  </div>
);

Manage.defaultProps = {};

const styles = {
  root: {},
};

export default withStyles(styles)(Manage);
