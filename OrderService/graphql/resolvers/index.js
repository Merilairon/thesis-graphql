const jwt = require("jsonwebtoken");
const Orders = require("../../data/models/order");

module.exports = {
  Order: {
    async __resolveReference(object) {
      return await Orders.getOneOrder({ _id: object.id });
    },
    products(order) {
      let productsRepresentation = [];

      order.products.forEach((product) => {
        productsRepresentation.push({
          __typename: "Product",
          id: product,
        });
      });
      return productsRepresentation;
    },
  },
  Account: {
    async orders(account) {
      return await Orders.getAccountOrders({ account: account.id });
    },
  },
  Query: {
    //TODO: only allow your account
    async order(_, { id }) {
      return await Orders.getOneOrder({ _id: id });
    },
    //TODO: only allow admin account
    async orders() {
      return await Orders.getAllOrders();
    },
  },
  Mutation: {
    async insertOrder(_, { products }, { user }) {
      try {
        let order = await Orders.insertOrder({
          account: user.sub,
          products,
          status: false,
        });
        return order;
      } catch (e) {
        //TODO: Error handling
      }
    },
    async updateOrder(_, { id, account, products, status }) {
      try {
        let order = await Orders.updateProduct({
          _id: id,
          account,
          products,
          status,
        });
        return order;
      } catch (e) {
        //TODO: Error handling
      }
    },
    async deleteOrder(_, { id }, { user }) {
      try {
        let order = await Orders.deleteOrder({
          _id: id,
          account: user.sub,
        });
        return order;
      } catch (e) {
        //TODO: Error handling
      }
    },
  },
};
