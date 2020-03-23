import { objectType, extendType, intArg, idArg } from 'nexus';
import { Polygon, Geometry } from './geometry';
import resolvers from '../resolvers';

export const Region = objectType({
  name: 'Region',
  definition(t) {
    t.id('id', { nullable: true })
    t.string('name', { nullable: true })
    t.string('province', { nullable: true })
    t.string('code', { nullable: true })
    t.field('geometry', { type: Geometry, nullable: true })
  }
})

export const RegionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('region', { 
      args: { 
        id: idArg({ required: true })
      }, 
      type: Region, 
      nullable: true,
      resolve: resolvers.Query.region, 
    })
    t.list.field('regions', {
      args: {
        skip: intArg({ required: false }),
        limit: intArg({ required: false })
      },
      type: Region, 
      nullable: true,
      resolve: resolvers.Query.regions,
    })
    t.int('countRegions', { 
      nullable: true,
      resolve: resolvers.Query.countRegions
    })
  }
})

