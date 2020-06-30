const { gql } = require("apollo-server");

const typeDefs = gql`
  type Account @key(fields: "id") {
    id: ID!
    username: String
    email: String
  }
  extend type Query {
    account(id: ID!): Account
    accounts: [Account]
    currentAccount: Account!
  }
  extend type Mutation {
    login(username: String!, password: String!): String
    register(username: String!, email: String!, password: String!): String
    updateAccount(username: String!, email: String!, password: String!): Account
    deleteAccount: Account
  }
`;

module.exports = typeDefs;
