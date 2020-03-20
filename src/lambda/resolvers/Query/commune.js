
import { query as q } from 'faunadb';
import { formatCommunes } from '../../formater';

export const Commune = {
  commune: (parent, { id }, context) => {
    return {};
  },
  communes: async (parent, args, context) => {
    const { data } = await context.client.query(
      q.Paginate(
        q.Match(q.Index('paginate_communes')),
        { size: 10 }
      ) 
    );
    const result = await context.client.query(data.map(ref => q.Get(ref)))
    return formatCommunes(result);
  }
}
