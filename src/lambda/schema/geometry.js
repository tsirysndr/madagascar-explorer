import { objectType, extendType } from 'nexus';

export const Polygon = objectType({
  name: 'Polygon',
  definition(t) {
    t.string('type', { nullable: true })
    t.float('coordinates', {  list: [ false, false, false ], nullable: true })
  }
})

export const MultiPolygon = objectType({
  name: 'MultiPolygon',
  definition(t) {
    t.string('type', { nullable: true })
    t.float('coordinates', { list: [false, false, false, false], nullable: true })
  }
})

export const Geometry = objectType({
  name: 'Geometry',
  definition(t) {
    t.string('type', { nullable: true })
    t.field('polygon', { type: Polygon, nullable: true })
    t.field('multipolygon', { type: MultiPolygon, nullable: true })
  }
})
