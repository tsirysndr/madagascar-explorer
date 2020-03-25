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

export const RegionList = objectType({
  name: 'RegionList',
  definition(t) {
    t.field('data', { list: [false], type: Region, nullable: true })
    t.field('after', { type: Region, nullable: true })
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
    t.field('regions', {
      args: {
        after: idArg({ required: false }),
        size: intArg({ required: false })
      },
      type: RegionList, 
      nullable: true,
      resolve: resolvers.Query.regions,
    })
    t.int('countRegions', { 
      nullable: true,
      resolve: resolvers.Query.countRegions
    })
  }
})

