import { makeSchema } from 'nexus';
import { Query } from './base';
import { Commune, CommuneQuery } from './commune';
import { Country, CountryQuery } from './country';
import { District, DistrictQuery } from './district';
import { Fokontany, FokontanyQuery } from './fokontany';
import { Polygon, MultiPolygon } from './geometry';
import { Region, RegionQuery } from './region';
import { Results, SearchQuery } from './search';

export default makeSchema({
  types: [
    Query,
    Commune,
    CommuneQuery,
    Country,
    CountryQuery,
    District,
    DistrictQuery,
    Fokontany,
    FokontanyQuery,
    Polygon,
    MultiPolygon,
    Region,
    RegionQuery,
    SearchQuery,
    Results,
  ],
});
