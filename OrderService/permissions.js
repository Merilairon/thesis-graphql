const { rule, shield } = require("graphql-shield");

const isAuthenticated = rule()((parent, args, { user }) => {
  return user !== null;
});

const permissions = shield({
  Mutation: {
    insertOrder: isAuthenticated,
    updateOrder: isAuthenticated,
    deleteOrder: isAuthenticated,
  },
});

module.exports = { permissions };
