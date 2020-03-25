import { objectType, extendType, intArg, idArg } from 'nexus';
import { Geometry } from './geometry';
import resolvers from '../resolvers';

export const Commune = objectType({
  name: 'Commune',
  definition(t) {
    t.id('id', { nullable: true })
    t.string('name', { nullable: true })
    t.string('province', { nullable: true })
    t.string('code', { nullable: true })
    t.string('district', { nullable: true })
    t.string('region', { nullable: true })
    t.field('geometry', { type: Geometry, nullable: true })
  }
})

export const CommuneList = objectType({
  name: 'CommuneList',
  definition(t) {
    t.field('data', { list: [false], type: Commune, nullable: true })
    t.field('after', { type: Commune, nullable: true })
  }
})

export const CommuneQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('commune', { 
      args: { 
        id: idArg({ required: true })
      }, 
      type: Commune, 
      nullable: true,
      resolve: resolvers.Query.commune, 
    })
    t.field('communes', { 
      args: {
        after: idArg({ required: false }),
        size: intArg({ required: false })
      },
      type: CommuneList, 
      nullable: true,
      resolve: resolvers.Query.communes, 
    })
    t.int('countCommunes', { 
      nullable: true,
      resolve: resolvers.Query.countCommunes
    })
  }
})
