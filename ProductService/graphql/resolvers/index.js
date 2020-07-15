const jwt = require("jsonwebtoken");
const Products = require("../../data/models/product");

module.exports = {
  Product: {
    async __resolveReference(object) {
      return await Products.getOneProduct({ _id: object.id });
    },
  },
  Query: {
    async product(_, { id }) {
      return await Products.getOneProduct({ _id: id });
    },
    async products() {
      return await Products.getAllProducts();
    },
  },
  Mutation: {
    async insertProduct(_, { name, description, pictureUrl, price }) {
      try {
        let product = await Products.insertProduct({
          name,
          description,
          pictureUrl,
          price,
        });
        return product;
      } catch (e) {
        throw new Error("An error occured during product creation");
      }
    },
    async updateProduct(_, { id, name, description, pictureUrl, price }) {
      try {
        let product = await Products.updateProduct({
          _id: id,
          name,
          description,
          pictureUrl,
          price,
        });
        return product;
      } catch (e) {
        throw new Error("An error occured during order modification");
      }
    },
    async deleteProduct(_, { id }) {
      try {
        let product = await Products.deleteProduct({
          _id: id,
        });
        return product;
      } catch (e) {
        throw new Error("An error occured during order creation");
      }
    },
  },
};
