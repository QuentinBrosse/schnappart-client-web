// @flow

import React from 'react';
import type { Node } from 'react';
import { Fetch } from 'react-request';
import config from '../../config';

type Props = {
  classes: Object,
  endpoint: string,
  body?: Object,
};

export default ({ classes, endpoint, body, ...rest }: Props): Node => {
  const endpointWithoutSlashes = endpoint.replace(/(^\/+|\/+$)/mg, '');
  return (
    <Fetch
      url={`${config.baseApiUrl}${endpointWithoutSlashes}/`}
      {...rest}
      headers={{
        'Content-Type': 'application/json',
        ...rest.headers
      }}
      body={JSON.stringify(body)}
    />
  );
};
