// @flow

import type { Feature, FetchFeature } from '../types/feature';

// eslint-disable-next-line import/prefer-default-export
export const fetchFeatures = (features: Feature[]): FetchFeature => ({
  type: 'FEATURE_FETCH_SUCCESS',
  payload: {
    features,
  },
});
