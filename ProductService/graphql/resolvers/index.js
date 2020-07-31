const jwt = require("jsonwebtoken");
const controller = require("../../controller");

module.exports = {
  Product: {
    async __resolveReference(object) {
      try {
        return await controller.product({ id: object.id });
      } catch (e) {
        throw new Error("An error occured during product retrieval");
      }
    },
  },
  Query: {
    async product(_, { id }) {
      try {
        return await controller.product({ id });
      } catch (e) {
        throw new Error("An error occured during product retrieval");
      }
    },
    async products() {
      try {
        return await controller.products();
      } catch (e) {
        throw new Error("An error occured during product retrieval");
      }
    },
  },
  Mutation: {
    async insertProduct(_, { name, description, pictureUrl, price }) {
      try {
        return await controller.insertProduct({
          name,
          description,
          pictureUrl,
          price,
        });
      } catch (e) {
        throw new Error("An error occured during product creation");
      }
    },
    async updateProduct(_, { id, name, description, pictureUrl, price }) {
      try {
        return await controller.updateProduct({
          id,
          name,
          description,
          pictureUrl,
          price,
        });
      } catch (e) {
        throw new Error("An error occured during order modification");
      }
    },
    async deleteProduct(_, { id }) {
      try {
        return await controller.deleteProduct({ id });
      } catch (e) {
        throw new Error("An error occured during order creation");
      }
    },
  },
};
