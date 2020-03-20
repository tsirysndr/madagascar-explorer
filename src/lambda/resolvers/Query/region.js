import { query as q } from 'faunadb';
import { formatRegions } from '../../formater';

export const Region = {
  region: (parent, { id }, context) => {
    return {};
  },
  regions: async (parent, args, context) => {
    const { data } = await context.client.query(
      q.Paginate(
        q.Match(q.Index('paginate_regions')),
      ) 
    );
    const result = await context.client.query(data.map(ref => q.Get(ref)))
    return formatRegions(result);
  }
}
