import {ApolloServer} from 'apollo-server';
import typeDefs from './src/schema.js';
import productResolvers from './src/resolvers/products.js'
import userResolvers from './src/resolvers/users.js'
import ProductAPI from './src/datasources/products.js';
import UserAPI from './src/datasources/users.js';

const resolvers = {
  Query: Object.assign({}, productResolvers.Query, userResolvers.Query),
  Mutation: Object.assign({}, productResolvers.Mutation, userResolvers.Mutation),
  User: Object.assign({}, userResolvers.User),
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
 dataSources: () => {
   return {
        productAPI: new ProductAPI(),
        userAPI: new UserAPI(),
   }
 }
    });

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `);
});