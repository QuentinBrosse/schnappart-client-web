// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from '@material-ui/core/styles';

type Props = {
  classes: Object,
};

const Manage = ({ classes }: Props): Node => (
  'Inbox'
);

Manage.defaultProps = {};

const styles = {}

export default withStyles(styles)(Manage);
