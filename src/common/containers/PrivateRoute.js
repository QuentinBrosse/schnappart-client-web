// @flow

import React from 'react';
import type { Node } from 'react';
import { Redirect, Route } from 'react-router-dom';

type Props = {
  component: Function,
  location: Object,
};

const PrivateRoute = ({
  component: Component,
  location,
  ...rest
}: Props): Node => {
  const isConnected = false;
  return (
    <Route
      {...rest}
      render={props => {
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

export default PrivateRoute;
