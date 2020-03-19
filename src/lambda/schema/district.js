import { objectType, extendType, stringArg } from 'nexus';
import { Polygon } from './geometry';
import resolvers from '../resolvers';

export const District = objectType({
  name: 'District',
  definition(t) {
    t.id('id', { nullable: true })
    t.string('name', { nullable: true })
    t.string('province', { nullable: true })
    t.string('code', { nullable: true })
    t.string('region', { nullable: true })
    t.field('geometry', { type: Polygon, nullable: true })
  }
})

export const DistrictQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('district', { 
      args: { 
        id: stringArg({ required: true })
      }, 
      type: District, 
      nullable: true,
      resolve: resolvers.Query.district 
    })
    t.list.field('districts', { 
      type: District, 
      nullable: true,
      resolve: resolvers.Query.districts
    })
  }
})
