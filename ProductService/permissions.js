const { rule, shield, and } = require("graphql-shield");

const isAuthenticated = rule({ cache: "contextual" })(
  (parent, args, { user }) => {
    return user !== null;
  }
);

const isAuthorizedAsAdmin = rule({ cache: "contextual" })(
  (parent, args, { user }) => {
    return user !== null && user.roles.includes("admin");
  }
);

const permissions = shield({
  Mutation: {
    insertProduct: and(isAuthenticated, isAuthorizedAsAdmin),
    updateProduct: and(isAuthenticated, isAuthorizedAsAdmin),
    deleteProduct: and(isAuthenticated, isAuthorizedAsAdmin),
  },
});

module.exports = { permissions };
