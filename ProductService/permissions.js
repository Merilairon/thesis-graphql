const { rule, shield } = require("graphql-shield");

const isAuthenticated = rule()((parent, args, { user }) => {
  return user !== null;
});

const permissions = shield({
  //TODO: change to only admin
  Mutation: {
    insertProduct: isAuthenticated,
    updateProduct: isAuthenticated,
    deleteProduct: isAuthenticated,
  },
});

module.exports = { permissions };
