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

export const FokontanyList = objectType({
  name: 'FokontanyList',
  definition(t) {
    t.field('data', { list: [false], type: Fokontany, nullable: true })
    t.field('after', { type: Fokontany, nullable: true })
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
    t.field('allFokontany', { 
      args: {
        after: idArg({ required: false }),
        size: intArg({ required: false })
      },
      type: FokontanyList, 
      nullable: true ,
      resolve: resolvers.Query.allFokontany,
    })
    t.int('countFokontany', { 
      nullable: true,
      resolve: resolvers.Query.countFokontany
    })
  }
})
