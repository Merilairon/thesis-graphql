const { rule, shield, and } = require("graphql-shield");
const Users = require("./data/models/user");

const isAuthenticated = rule()((parent, args, { user }) => {
  return user !== null;
});

const isOwnAccountOrAdmin = rule()((parent, { id, roles }, { user }) => {
  if (roles == null || roles.length !== 0)
    return user !== null && (user.roles.includes("admin") || user.sub == id);
  return user !== null && user.roles.includes("admin");
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
