
import { query as q } from 'faunadb';
import { formatCommunes } from '../../formater';

export const Commune = {
  commune: async (parent, { id }, context) => {
    const result = await context.client.query(
      q.Get(q.Ref(q.Collection('communes'), id))
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
      district: result.data.District,
      region: result.data.Region,
    };
  },
  communes: async (parent, args, context) => {
    const { data } = await context.client.query(
      q.Paginate(
        q.Match(q.Index('all_communes')),
        // { size: 10 }
      ) 
    );
    return formatCommunes(data);
  }
}
