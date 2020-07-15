const jwt = require("jsonwebtoken");
const Products = require("../../data/models/product");
const controller = require("../../controller");

module.exports = {
  //TODO: catch
  Product: {
    async __resolveReference(object) {
      return await controller.product({ id: object.id });
    },
  },
  Query: {
    async product(_, { id }) {
      return await controller.product({ id });
    },
    async products() {
      return await controller.products();
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
