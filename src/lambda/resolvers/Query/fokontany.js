import { query as q } from 'faunadb';
import { formatFokontany } from '../../formater';

export const Fokontany = {
  fokontany: async (parent, { id }, context) => {
    const result = await context.client.query(
      q.Get(q.Ref(q.Collection('fokontany'), id))
    )
    if (!result.ref) {
      return {}
    }
    return {
      id: result.ref.value.id,
      geometry: {
        type: result.data.Geometry.Type,
        coordinates: result.data.Geometry.Coordinates
      },
      name: result.data.Name,
      province: result.data.Province,
      code: result.data.Code,
      commune: result.data.Commune,
      district: result.data.District,
      region: result.data.Region,
    };
  },
  allFokontany: async (parent, args, context) => {
    const { data } = await context.client.query(
      q.Paginate(
        q.Match(q.Index('all_fokontany')),
        // { size: 10 }
      ) 
    );
    return formatFokontany(data);
  }
}
