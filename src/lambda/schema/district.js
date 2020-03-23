import { objectType, extendType, intArg, idArg } from 'nexus';
import { Geometry } from './geometry';
import resolvers from '../resolvers';

export const District = objectType({
  name: 'District',
  definition(t) {
    t.id('id', { nullable: true })
    t.string('name', { nullable: true })
    t.string('province', { nullable: true })
    t.string('code', { nullable: true })
    t.string('region', { nullable: true })
    t.field('geometry', { type: Geometry, nullable: true })
  }
})

export const DistrictQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('district', { 
      args: { 
        id: idArg({ required: true })
      }, 
      type: District, 
      nullable: true,
      resolve: resolvers.Query.district 
    })
    t.list.field('districts', { 
      args: {
        skip: intArg({ required: false }),
        limit: intArg({ required: false })
      },
      type: District, 
      nullable: true,
      resolve: resolvers.Query.districts
    })
    t.int('countDistricts', { 
      nullable: true,
      resolve: resolvers.Query.countDistricts
    })
  }
})
