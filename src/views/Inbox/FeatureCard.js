// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

type Props = {
  classes: Object,
  icon: Object,
  label: string,
  value: string,
};

const FeatureItem = ({ classes, icon: Icon, value, label }: Props): Node => (
  <Paper className={classes.root}>
    <Tooltip id={`tooltip-${label}`} title={label} placement="bottom">
      <Icon className={classes.icon} color="primary" />
    </Tooltip>
    <Typography className={classes.value} noWrap>
      {value}
    </Typography>
  </Paper>
);

FeatureItem.defaultProps = {};

const styles = ({ spacing }) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    padding: spacing.unit,
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: 25,
  },
  value: {
    lineHeight: '25px',
  },
});

export default withStyles(styles)(FeatureItem);
