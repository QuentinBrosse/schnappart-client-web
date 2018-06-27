// @flow

import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import { Fetch } from '../../common/containers';
import { fetchFeatures } from '../../actions/feature';

type Props = {
  dFetchFeatures: typeof fetchFeatures,
};

const GlobalFetches = ({ dFetchFeatures }: Props): Node => (
  <Fetch
    endpoint="feature"
    afterFetch={({ data: features, failed }) => {
      if (!failed) {
        dFetchFeatures(features);
      }
    }}
  />
);

const mapDispatchToProps = {
  dFetchFeatures: fetchFeatures,
};

export default connect(null, mapDispatchToProps)(GlobalFetches);
