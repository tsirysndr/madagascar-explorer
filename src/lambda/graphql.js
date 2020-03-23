import { ApolloServer } from 'apollo-server-lambda';
import faunadb from 'faunadb';
import schema from './schema';

const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET })

const server = new ApolloServer({
  schema,
  context: () => {
    return { client }
  }
});

exports.handler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});
