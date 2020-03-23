import { query as q } from 'faunadb';
import { formatDistricts } from '../../formater';

export const District = {
  district: async (parent, { id }, context) => {
    const result = await context.client.query(
      q.Get(q.Ref(q.Collection('districts'), id))
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
      region: result.data.Region,
    };
  },
  districts: async (parent, args, context) => {
    const { data } = await context.client.query(
      q.Paginate(
        q.Match(q.Index('all_districts')),
        // { size: 10 }
      ) 
    );
    return formatDistricts(data);
  }
}