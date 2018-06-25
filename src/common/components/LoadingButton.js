// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

type Props = {
  classes: Object,
  loading?: boolean,
  success?: boolean,
  children: Node,
  variant?: 'fab' | 'contained',
};

const LoadingButton = ({
  classes,
  loading,
  success,
  children,
  variant,
  ...rest
}: Props): Node => {
  const buttonClassName = classNames({ [classes.buttonSuccess]: success });
  const isFab = variant === 'fab';
  const progressClass = isFab
    ? classes.fabProgress
    : classes.buttonProgress;
  const progressSize = isFab ? 68 : 24;
  const progressThickness = isFab ? 1.4 : 3.6;
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          variant={variant}
          className={buttonClassName}
          disabled={loading}
          {...rest}
        >
          {children}
        </Button>
        {
          loading &&
          <CircularProgress
            size={progressSize}
            thickness={progressThickness}
            className={progressClass}
          />
        }
      </div>
    </div>
  );
};

LoadingButton.defaultProps = {
  loading: false,
  success: false,
  variant: 'contained',
};

const styles = ({ spacing }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: spacing.unit,
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

export default withStyles(styles)(LoadingButton);
