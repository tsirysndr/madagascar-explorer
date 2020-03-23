import { query as q } from 'faunadb';
import { formatRegions } from '../../formater';

export const Region = {
  region: async (parent, { id }, context) => {
    const result = await context.client.query(
      q.Get(q.Ref(q.Collection('regions'), id))
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
    };
  },
  regions: async (parent, args, context) => {
    const { data } = await context.client.query(
      q.Paginate(
        q.Match(q.Index('all_regions')),
      ) 
    );
    return formatRegions(data);
  }
}
