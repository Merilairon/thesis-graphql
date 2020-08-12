const { rule, shield, and } = require("graphql-shield");
const Users = require("./data/models/user");

const isAuthenticated = rule()((parent, args, { user }) => {
  return user !== null;
});

const isOwnAccountOrAdmin = rule()((parent, { id, roles }, { user }) => {
  return user !== null && (user.sub == id || user.roles.includes("admin"));
});

const permissions = shield({
  Query: {
    account: isAuthenticated,
    accounts: isAuthenticated,
    currentAccount: isAuthenticated,
  },
  Mutation: {
    updateAccount: and(isAuthenticated, isOwnAccountOrAdmin),
    deleteAccount: isAuthenticated,
  },
});

module.exports = { permissions };
