const { rule, shield, and, or } = require("graphql-shield");
const Orders = require("./data/models/order");

const isAuthenticated = rule()((parent, args, { user }) => {
  return user !== null;
});

const isAuthorizedAsAdmin = rule({ cache: "contextual" })(
  (parent, args, { user }) => {
    return user !== null && user.roles.includes("admin");
  }
);

const isOwnAccount = rule({ cache: "contextual" })(
  async (parent, { id }, { user }, info) => {
    let order = await Orders.getOneOrder({ _id: id });
    return order !== null && order.account == user.sub;
  }
);

const permissions = shield({
  Query: {
    order: and(isAuthenticated, or(isOwnAccount, isAuthorizedAsAdmin)),
    orders: and(isAuthenticated, isAuthorizedAsAdmin),
  },
  Mutation: {
    insertOrder: and(isAuthenticated, isAuthorizedAsAdmin),
    updateOrder: and(isAuthenticated, isAuthorizedAsAdmin),
    deleteOrder: and(isAuthenticated, isAuthorizedAsAdmin),
  },
});

module.exports = { permissions };
