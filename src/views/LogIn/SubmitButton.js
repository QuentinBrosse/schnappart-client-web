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
};

const SubmitButton = ({ classes, loading, success, children, ...rest }: Props): Node => {
  const buttonClassName = classNames({ [classes.buttonSuccess]: success });
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={buttonClassName}
          disabled={loading}
          {...rest}
        >
          {children}
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  );
}

SubmitButton.defaultProps = {
  loading: false,
  success: false,
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
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

export default withStyles(styles)(SubmitButton);
