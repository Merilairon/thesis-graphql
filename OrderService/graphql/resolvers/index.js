const jwt = require("jsonwebtoken");
const controller = require("../../controller");

module.exports = {
  Order: {
    //TODO: catch
    async __resolveReference(object) {
      return await controller.order({ id: id });
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
      return await controller.accountOrders({ account });
    },
  },
  Query: {
    //TODO: catch
    //TODO: only allow your accounts orders
    async order(_, { id }) {
      return await controller.order({ id });
    },
    //TODO: only allow admin accounts
    async orders() {
      return await controller.orders();
    },
  },
  Mutation: {
    async insertOrder(_, { products }, { user }) {
      try {
        return await controller.insertOrder({ products, user });
      } catch (e) {
        throw new Error("An error occured during order creation");
      }
    },
    //TODO: only allow yourself or admin to edit
    async updateOrder(_, { id, account, products, status }) {
      try {
        return await controller.updateOrder({ id, account, products, status });
      } catch (e) {
        throw new Error("An error occured during order modification");
      }
    },
    //TODO: only allow yourself or admin to remove
    async deleteOrder(_, { id }, { user }) {
      try {
        return await controller.deleteOrder(id, user);
      } catch (e) {
        throw new Error("An error occured during order removal");
      }
    },
  },
};
