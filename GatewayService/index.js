require("dotenv").config();
const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const helmet = require("helmet");
const expressJwt = require("express-jwt");

const port = 4000;
const app = express();

app.use(
  expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    credentialsRequired: false,
  })
);
app.use(helmet());

//TODO: seperate file?
const gateway = new ApolloGateway({
  serviceList: [
    {
      name: "accounts",
      url: "http://localhost:4001",
    },
    {
      name: "products",
      url: "http://localhost:4002",
    },
    {
      name: "orders",
      url: "http://localhost:4003",
    },
  ],
  buildService({ name, url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        request.http.headers.set(
          "user",
          context.user ? JSON.stringify(context.user) : null
        );
      },
    });
  },
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  context: ({ req }) => {
    const user = req.user || null;
    return { user };
  },
});

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
