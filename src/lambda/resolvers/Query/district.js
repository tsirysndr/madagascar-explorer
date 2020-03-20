import { query as q } from 'faunadb';
import { formatDistricts } from '../../formater';

export const District = {
  district: (parent, { id }, context) => {
    return {};
  },
  districts: async (parent, args, context) => {
    const { data } = await context.client.query(
      q.Paginate(
        q.Match(q.Index('paginate_districts')),
        { size: 10 }
      ) 
    );
    const result = await context.client.query(data.map(ref => q.Get(ref)))
    return formatDistricts(result);
  }
}