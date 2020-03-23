import alasql from 'alasql/dist/alasql';
import { query as q } from 'faunadb';
import { formatCommunes, formatFokontany, formatDistricts, formatRegions } from './formater';

export const search = async (context, keyword) => {
  const _fokontany = await context.client.query(
    q.Paginate(
      q.Match(q.Index('all_fokontany')),
    ) 
  );
  const _communes = await context.client.query(
    q.Paginate(
      q.Match(q.Index('all_communes')),
    ) 
  );
  const _districts = await context.client.query(
    q.Paginate(
      q.Match(q.Index('all_districts')),
    ) 
  );
  const _regions = await context.client.query(
    q.Paginate(
      q.Match(q.Index('all_regions')),
    ) 
  );

  const regions = alasql(`SELECT * FROM ? WHERE LOWER(name) LIKE '%${keyword}%' ORDER BY name ASC`, [formatRegions(_regions.data)]);
  const districts = alasql(`SELECT * FROM ? WHERE LOWER(name) LIKE '%${keyword}%' ORDER BY name ASC`, [formatDistricts(_districts.data)]);
  const communes = alasql(`SELECT * FROM ? WHERE LOWER(name) LIKE '%${keyword}%' ORDER BY name ASC`, [formatCommunes(_communes.data)]);
  const fokontany = alasql(`SELECT * FROM ? WHERE LOWER(name) LIKE '%${keyword}%' ORDER BY name ASC`, [formatFokontany(_fokontany.data)]);

  return { regions, districts, communes, fokontany };
}
