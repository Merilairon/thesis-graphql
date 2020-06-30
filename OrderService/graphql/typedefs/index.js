const { gql } = require("apollo-server");

const typeDefs = gql`
  type Order @key(fields: "id") {
    id: ID!
    account: Account
    products: [Product]
    status: Boolean
  }
  extend type Account @key(fields: "id") {
    id: ID! @external
    orders: [Order]
  }
  extend type Product @key(fields: "id") {
    id: ID! @external
  }
  extend type Query {
    order(id: ID!): Order
    orders: [Order]
  }
  extend type Mutation {
    insertOrder(products: [ID]): Order
    updateOrder(id: ID!, account: ID, products: [ID], status: Boolean): Order
    deleteOrder(id: ID!): Order
  }
`;

module.exports = typeDefs;
