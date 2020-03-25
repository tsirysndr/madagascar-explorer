import { query as q } from 'faunadb';
import { formatRegions, formatRegion } from '../../formater';
import lowercasekeys from 'lowercase-keys';

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
        polygon: result.data.Geometry.Type === 'Polygon' ? lowercasekeys(result.data.Geometry) : null,
        multipolygon: result.data.Geometry.Type === 'MultiPolygon' ? lowercasekeys(result.data.Geometry) : null
      },
      name: result.data.Name,
      province: result.data.Province,
      code: result.data.Code,
    };
  },
  regions: async (parent, { after, size }, context) => {
    const pagination = after && size ? { after: [ q.Ref(q.Collection('regions'), after) ], size } : { size: 100 };
    const result = await context.client.query(
      q.Paginate(
        q.Match(q.Index('regions_sort_by_ref')),
        pagination
      ) 
    );
    return { data: formatRegions(result.data), after: formatRegion(result.after) };
  },
  countRegions: async (parent, args, context) => {
    const { data } = await context.client.query(
      q.Paginate(
        q.Match(q.Index('all_regions')),
        { size: 50000 },
      ) 
    );
    return data.length;
  }
}
