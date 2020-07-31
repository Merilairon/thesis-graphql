const { rule, shield } = require("graphql-shield");
const Users = require("./data/models/user");

const isAuthenticated = rule()((parent, args, { user }) => {
  return user !== null;
});

const permissions = shield({
  Query: {
    account: isAuthenticated,
    accounts: isAuthenticated,
    currentAccount: isAuthenticated,
  },
  Mutation: {
    updateAccount: isAuthenticated, //TODO: add only admin can do roles
    deleteAccount: isAuthenticated,
  },
});

module.exports = { permissions };
