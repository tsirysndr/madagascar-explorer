import { ApolloServer } from 'apollo-server-lambda';
import { downloadJSON } from './loader';
import schema from './schema';

let regions = [];
let communes = [];
let districts = [];
let fokontany = [];

let regionsIndex = [];
let communesIndex = [];
let districtsIndex = [];
let fokontanyIndex = [];

downloadJSON().then((result) => {
  regions = result.regions;
  districts = result.districts;
  communes = result.communes;
  fokontany = result.fokontany;
  regionsIndex = result.regionsIndex;
  districtsIndex = result.districtsIndex;
  communesIndex = result.communesIndex;
  fokontanyIndex = result.fokontanyIndex;
})
.catch(err => console.log(err));

const server = new ApolloServer({
  schema,
  context: () => {
    return {
      regions,
      districts,
      communes,
      fokontany,
      regionsIndex,
      districtsIndex,
      communesIndex,
      fokontanyIndex
    }
  }
});

exports.handler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});
