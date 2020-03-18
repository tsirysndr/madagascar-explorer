import { objectType, extendType } from 'nexus';
import { MultiPolygon } from './geometry';
import resolvers from '../resolvers';

export const Country = objectType({
  name: 'Country',
  definition(t) {
    t.id('id', { nullable: true })
    t.string('name', { nullable: true })
    t.string('code', { nullable: true })
    t.field('geometry', { type: MultiPolygon, nullable: true })
  }
})

export const CountryQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('country', { 
      type: Country, 
      nullable: true,
      resolve: resolvers.Query.country
    })
  }
})
