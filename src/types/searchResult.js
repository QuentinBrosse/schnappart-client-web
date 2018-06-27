// @flow

import type { Search } from './search';
import type { SearchResultFeature } from './feature';

export type SearchResult = {
  +id: number,
  +search: Search,
  +url: string,
  +originalId: number,
  +title: string,
  +description: string,
  +price: number,
  +chargesIncluded: boolean,
  +publicationDate: string,
  +realEstateType: string,
  +rooms: number,
  +furnished: null | boolean,
  +surface: number,
  +images: string[],
  +zipcode: string,
  +city: string,
  +ges: string,
  +energyRate: string,
  +alive: boolean,
  +accepted: null | string,
  +features: SearchResultFeature[],
};
