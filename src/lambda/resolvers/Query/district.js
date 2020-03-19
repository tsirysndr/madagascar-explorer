import { find } from '../../repo';

const baseURL = 'https://gitlab.com/tsiry.sndr/mg-geojson/-/raw/master/assets/districts';

export const District = {
  district: (parent, { id }, context) => {
    return find(id, context.districtsIndex, baseURL);
  },
  districts: (parent, args, context) => {
    return context.districts;
  }
}