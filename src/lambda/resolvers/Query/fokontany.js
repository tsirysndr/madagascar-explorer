import { query as q } from 'faunadb';
import { formatFokontany } from '../../formater';

export const Fokontany = {
  fokontany: (parent, { id }, context) => {
    return {};
  },
  allFokontany: async (parent, args, context) => {
    const { data } = await context.client.query(
      q.Paginate(
        q.Match(q.Index('paginate_fokontany')),
        { size: 10 }
      ) 
    );
    const result = await context.client.query(data.map(ref => q.Get(ref)))
    return formatFokontany(result);
  }
}
