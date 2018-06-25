// @flow

import React from 'react';
import type { Node } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserState } from '../../types/user';

type Props = {
  component: Function,
  location: Object,
  user: UserState,
};

const PrivateRoute = ({
  component: Component,
  location,
  user,
  ...rest
}: Props): Node => {
  const isConnected = user.user;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isConnected) {
          return <Component {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

PrivateRoute.defaultProps = {};

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(PrivateRoute);
