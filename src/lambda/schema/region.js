import { objectType, extendType, stringArg, intArg } from 'nexus';
import { Polygon } from './geometry';
import resolvers from '../resolvers';

export const Region = objectType({
  name: 'Region',
  definition(t) {
    t.id('id', { nullable: true })
    t.string('name', { nullable: true })
    t.string('province', { nullable: true })
    t.string('code', { nullable: true })
    t.field('geometry', { type: Polygon, nullable: true })
  }
})

export const RegionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('region', { 
      args: { 
        id: stringArg({ required: true })
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
  }
})

