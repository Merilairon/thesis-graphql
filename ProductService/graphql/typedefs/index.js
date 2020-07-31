const { gql } = require("apollo-server");

const typeDefs = gql`
  type Product @key(fields: "id") {
    id: ID!
    name: String
    description: String
    pictureUrl: String
    price: Float
  }
  extend type Query {
    product(id: ID!): Product
    products: [Product]
  }
  extend type Mutation {
    insertProduct(
      name: String
      description: String
      pictureUrl: String
      price: Float
    ): Product
    updateProduct(
      id: ID!
      name: String
      description: String
      pictureUrl: String
      price: Float
    ): Product
    deleteProduct(id: ID!): Product
  }
`;

module.exports = typeDefs;
