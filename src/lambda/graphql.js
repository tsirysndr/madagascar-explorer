import { ApolloServer } from 'apollo-server-lambda';
import { downloadJSON } from './loader';
import schema from './schema';

let country = {};
let regions = [];
let communes = [];
let districts = [];
let fokontany = [];

downloadJSON().then((result) => {
  country = result.country;
  regions = result.regions;
  districts = result.districts;
  communes = result.communes;
  fokontany = result.fokontany;
});

const server = new ApolloServer({
  schema,
  context: () => {
    return {
      country,
      regions,
      districts,
      communes,
      fokontany
    }
  }
});

exports.handler = server.createHandler();
