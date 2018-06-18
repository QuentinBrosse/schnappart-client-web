// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from '@material-ui/core/styles';

type Props = {
  classes: Object,
};

const LogIn = ({ classes }: Props): Node => (
  'Je suis l\'App ! :)'
);

LogIn.defaultProps = {};

const styles = {}

export default withStyles(styles)(LogIn);
