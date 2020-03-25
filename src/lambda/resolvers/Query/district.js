import { query as q } from 'faunadb';
import { formatDistricts, formatDistrict } from '../../formater';
import lowercasekeys from 'lowercase-keys';

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
        polygon: result.data.Geometry.Type === 'Polygon' ? lowercasekeys(result.data.Geometry) : null,
        multipolygon: result.data.Geometry.Type === 'MultiPolygon' ? lowercasekeys(result.data.Geometry) : null
      },
      name: result.data.Name,
      province: result.data.Province,
      code: result.data.Code,
      region: result.data.Region,
    };
  },
  districts: async (parent, { after, size }, context) => {
    const pagination = after && size ? { after: [ q.Ref(q.Collection('districts'), after) ], size } : { size: 10 };
    const result = await context.client.query(
      q.Paginate(
        q.Match(q.Index('districts_sort_by_ref')),
        pagination
      ) 
    );
    return { data: formatDistricts(result.data), after: formatDistrict(result.after) };
  },
  countDistricts: async (parent, args, context) => {
    const { data } = await context.client.query(
      q.Paginate(
        q.Match(q.Index('all_districts')),
        { size: 50000 },
      ) 
    );
    return data.length;
  }
}