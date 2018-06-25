// @flow

import React from 'react';
import type { Node } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/Inbox';
import HomeIcon from '@material-ui/icons/Home';
import { Link, NavLink } from 'react-router-dom';

type Props = {
  classes: Object,
};

const NavBar = ({ classes }: Props): Node => (
  <AppBar position="static">
    <Toolbar>
      <Typography
        variant="title"
        color="inherit"
        className={classes.appName}
        component={Link}
        to="/"
      >
        Schnappart
      </Typography>

      <IconButton color="inherit" aria-label="Home" component={NavLink} to="/">
        <HomeIcon />
      </IconButton>
      <IconButton color="inherit" aria-label="Inbox" component={NavLink} to="/inbox">
        {/* <Badge badgeContent={4} color="secondary"> */}
        <InboxIcon />
        {/* </Badge> */}
      </IconButton>
    </Toolbar>
  </AppBar>
);

NavBar.defaultProps = {};

const styles = ({ breakpoints, typography }) => ({
  appName: {
    marginRight: 'auto',
    textDecoration: 'none',
    [breakpoints.down('xs')]: {
      fontSize: typography.pxToRem(13),
    },
  },
});

export default withStyles(styles)(NavBar);
