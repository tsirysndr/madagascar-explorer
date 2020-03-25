
import { query as q } from 'faunadb';
import { formatCommunes, formatCommune } from '../../formater';
import lowercasekeys from 'lowercase-keys';

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
        polygon: result.data.Geometry.Type === 'Polygon' ? lowercasekeys(result.data.Geometry) : null,
        multipolygon: result.data.Geometry.Type === 'MultiPolygon' ? lowercasekeys(result.data.Geometry) : null
      },
      name: result.data.Name,
      province: result.data.Province,
      code: result.data.Code,
      district: result.data.District,
      region: result.data.Region,
    };
  },
  communes: async (parent, { after, size }, context) => {
    const pagination = after && size ? { after: [ q.Ref(q.Collection('communes'), after) ], size } : { size: 100 };
    const result = await context.client.query(
      q.Paginate(
        q.Match(q.Index('communes_sort_by_ref')),
        pagination
      ) 
    );
    return { data: formatCommunes(result.data), after: formatCommune(result.after) };
  },
  countCommunes: async (parent, args, context) => {
    const { data } = await context.client.query(
      q.Paginate(
        q.Match(q.Index('all_communes')),
        { size: 50000 },
      ) 
    );
    return data.length;
  }
}
