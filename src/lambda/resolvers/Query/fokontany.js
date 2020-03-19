import { find } from '../../repo';

const baseURL = 'https://gitlab.com/tsiry.sndr/mg-geojson/-/raw/master/assets/fokontany';

export const Fokontany = {
  fokontany: (parent, { id }, context) => {
    return find(id, context.fokontanyIndex, baseURL);
  },
  allFokontany: (parent, args, context) => {
    console.log(context.fokontany)
    return context.fokontany;
  }
}