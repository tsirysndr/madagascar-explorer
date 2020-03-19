import { objectType, extendType, stringArg } from 'nexus';
import { Polygon } from './geometry';
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
    t.field('geometry', { type: Polygon, nullable: true })
  }
})

export const CommuneQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('commune', { 
      args: { 
        id: stringArg({ required: true })
      }, 
      type: Commune, 
      nullable: true,
      resolve: resolvers.Query.commune, 
    })
    t.list.field('communes', { 
      type: Commune, 
      nullable: true,
      resolve: resolvers.Query.communes, 
    })
  }
})
