require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { applyMiddleware } = require("graphql-middleware");
const { buildFederatedSchema } = require("@apollo/federation");

const { connectDatabase } = require("./data/database");
connectDatabase();

const typeDefs = require("./graphql/typedefs");
const resolvers = require("./graphql/resolvers");
const { permissions } = require("./permissions");

const port = process.env.PORT || 4003;

const server = new ApolloServer({
  schema: applyMiddleware(
    buildFederatedSchema([{ typeDefs, resolvers }]),
    permissions
  ),
  context: ({ req }) => {
    const user = req.headers.user ? JSON.parse(req.headers.user) : null;
    return { user };
  },
  formatError: (err) => {
    delete err.extensions["exception"];
    // Otherwise return the original error.  The error can also
    // be manipulated in other ways, so long as it's returned.
    console.log(err);
    return err;
  },
});

server.listen({ port }).then(({ url }) => {
  console.log(`Accounts service ready at ${url}`);
});
