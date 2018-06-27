// @flow

import type { FeatureState, FeatureActions } from '../types/feature';

const initialState: FeatureState = {
  all: null,
};

export default (
  state: FeatureState = initialState,
  action: FeatureActions,
): FeatureState => {
  switch (action.type) {
    case 'FEATURE_FETCH_SUCCESS':
      return {
        all: action.payload.features,
      };
    default:
      return state;
  }
};
