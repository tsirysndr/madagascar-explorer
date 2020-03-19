import { find } from '../../repo';

const baseURL = 'https://gitlab.com/tsiry.sndr/mg-geojson/-/raw/master/assets/communes';

export const Commune = {
  commune: (parent, { id }, context) => {
    return find(id, context.communesIndex, baseURL);
  },
  communes: (parent, args, context) => {
    return context.communes;
  }
}
