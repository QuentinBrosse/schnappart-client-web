// @flow

export type Feature = {
  +id: number,
  +label: string,
  +key: string,
};

export type SearchResultFeature = {
  +id: number,
  +value: string,
  +searchResult: number,
  +feature: Feature,
};

export type FeatureState = {
  all: null | Feature[],
};

export type FetchFeature = {
  +type: 'FEATURE_FETCH_SUCCESS',
  +payload: {
    +features: Feature[],
  },
};

export type FeatureActions = FetchFeature;
