import { find } from '../../repo';

const baseURL = 'https://gitlab.com/tsiry.sndr/mg-geojson/-/raw/master/assets/regions';

export const Region = {
  region: (parent, { id }, context) => {
    return find(id, context.regionsIndex, baseURL);
  },
  regions: (parent, args, context) => {
    return context.regions;
  }
}
