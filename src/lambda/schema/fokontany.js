import { objectType, extendType, stringArg } from 'nexus';
import { Polygon } from './geometry';
import resolvers from '../resolvers';

export const Fokontany = objectType({
  name: 'Fokontany',
  definition(t) {
    t.id('id', { nullable: true })
    t.string('name', { nullable: true })
    t.string('province', { nullable: true })
    t.string('code', { nullable: true })
    t.field('geometry', { type: Polygon, nullable: true })
  }
})

export const FokontanyQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('fokontany', { 
      args: { 
        id: stringArg({ required: true })
      }, 
      type: Fokontany, 
      nullable: true,
      resolve: resolvers.Query.fokontany, 
    })
    t.list.field('allFokontany', { 
      type: Fokontany, 
      nullable: true ,
      resolve: resolvers.Query.allFokontany,
    })
  }
})
