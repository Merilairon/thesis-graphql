require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { applyMiddleware } = require("graphql-middleware");
const { buildFederatedSchema } = require("@apollo/federation");

const { connectDatabase, initializeModels } = require("./data/database");

connectDatabase();
initializeModels();

const typeDefs = require("./graphql/typedefs");
const resolvers = require("./graphql/resolvers");
const { permissions } = require("./permissions");

const port = 4002;

const server = new ApolloServer({
  schema: applyMiddleware(
    buildFederatedSchema([{ typeDefs, resolvers }]),
    permissions
  ),
  context: ({ req }) => {
    const user = req.headers.user ? JSON.parse(req.headers.user) : null;
    return { user };
  },
});

server.listen({ port }).then(({ url }) => {
  console.log(`Accounts service ready at ${url}`);
});
