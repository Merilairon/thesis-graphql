const jwt = require("jsonwebtoken");
const controller = require("../../controller");

module.exports = {
  Order: {
    async __resolveReference(object) {
      try {
        return await controller.order({ id: id });
      } catch (e) {
        throw new Error("An error occured during order retrieval");
      }
    },
    products(order) {
      try {
        let productsRepresentation = [];
        order.products.forEach((product) => {
          productsRepresentation.push({
            __typename: "Product",
            id: product,
          });
        });
        return productsRepresentation;
      } catch (e) {
        throw new Error("An error occured during order retrieval");
      }
    },
    account(order) {
      try {
        return {
          __typename: "Account",
          id: order.account,
        };
      } catch (e) {
        throw new Error("An error occured during order retrieval");
      }
    },
  },
  Account: {
    async orders(account) {
      try {
        return await controller.accountOrders({ account });
      } catch (e) {
        throw new Error("An error occured during order retrieval");
      }
    },
  },
  Query: {
    async order(_, { id }) {
      try {
        return await controller.order({ id });
      } catch (e) {
        throw new Error("An error occured during order retrieval");
      }
    },
    async orders() {
      try {
        return await controller.orders();
      } catch (e) {
        throw new Error("An error occured during order retrieval");
      }
    },
  },
  Mutation: {
    async insertOrder(_, { products }, { user }) {
      try {
        return await controller.insertOrder({ products, account: user.sub });
      } catch (e) {
        console.log(e);
        throw new Error("An error occured during order creation");
      }
    },
    async updateOrder(_, { id, account, products, status }) {
      try {
        return await controller.updateOrder({ id, account, products, status });
      } catch (e) {
        throw new Error("An error occured during order modification");
      }
    },
    async deleteOrder(_, { id }, { user }) {
      try {
        return await controller.deleteOrder(id, user);
      } catch (e) {
        throw new Error("An error occured during order removal");
      }
    },
  },
};
