import resolvers from '../resolvers';
import { extendType, stringArg, objectType } from 'nexus';
import { Region } from './region';
import { District } from './district';
import { Commune } from './commune';
import { Fokontany } from './fokontany';

export const Results = objectType({
  name: 'results',
  definition(t) {
    t.field('regions', { list:[false], type: Region, nullable: true })
    t.field('districts', { list:[false], type: District, nullable: true })
    t.field('communes', { list:[false], type: Commune, nullable: true })
    t.field('fokontany', { list:[false], type: Fokontany, nullable: true })
  }
})

export const SearchQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('search', {
      args: {
        keyword: stringArg({ required: true }),
      },
      type: Results, 
      nullable: true,
      resolve: resolvers.Query.search,
    })
  }
})
