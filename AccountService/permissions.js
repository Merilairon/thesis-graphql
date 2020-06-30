const { rule, shield } = require("graphql-shield");

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
    updateAccount: isAuthenticated,
    deleteAccount: isAuthenticated,
  },
});

module.exports = { permissions };
