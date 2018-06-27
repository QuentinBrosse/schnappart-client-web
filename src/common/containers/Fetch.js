// @flow

import React from 'react';
import type { Node } from 'react';
import { Fetch as ReactRequestFetch } from 'react-request';
import { connect } from 'react-redux';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import config from '../../config';

type Props = {
  classes: Object,
  endpoint: string,
  body?: Object,
  authToken: null | string,
};

const Fetch = ({
  classes, endpoint, body, authToken, ...rest
}: Props): Node => {
  const endpointWithoutSlashes = endpoint.replace(/(^\/+|\/+$)/mg, '');
  const authHeader = (authToken) ? { Authorization: `Token ${authToken}` } : {};
  return (
    <ReactRequestFetch
      url={`${config.baseApiUrl}${endpointWithoutSlashes}/`}
      {...rest}
      headers={{
        'Content-Type': 'application/json',
        ...rest.headers,
        ...authHeader,
      }}
      body={body ? JSON.stringify(snakecaseKeys(body)) : undefined}
      transformData={data => camelcaseKeys(data, { deep: true })}
    />
  );
};

Fetch.defaultProps = {
  body: null,
};

const mapStateToProps = ({ user: { user } }) => ({
  authToken: user ? user.authToken : null,
});

export default connect(mapStateToProps)(Fetch);
