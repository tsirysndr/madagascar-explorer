import { objectType, extendType, intArg, idArg } from 'nexus';
import { Geometry } from './geometry';
import resolvers from '../resolvers';

export const Fokontany = objectType({
  name: 'Fokontany',
  definition(t) {
    t.id('id', { nullable: true })
    t.string('name', { nullable: true })
    t.string('province', { nullable: true })
    t.string('code', { nullable: true })
    t.string('commune', { nullable: true })
    t.string('district', { nullable: true })
    t.string('region', { nullable: true })
    t.field('geometry', { type: Geometry, nullable: true })
  }
})

export const FokontanyQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('fokontany', { 
      args: { 
        id: idArg({ required: true })
      }, 
      type: Fokontany, 
      nullable: true,
      resolve: resolvers.Query.fokontany, 
    })
    t.list.field('allFokontany', { 
      args: {
        skip: intArg({ required: false }),
        limit: intArg({ required: false })
      },
      type: Fokontany, 
      nullable: true ,
      resolve: resolvers.Query.allFokontany,
    })
    t.int('countFokontany', { 
      nullable: true,
      resolve: resolvers.Query.countFokontany
    })
  }
})
