const Products = require("../data/models/product");

module.exports = {
  product: async ({ id }) => {
    return await Products.getOneProduct({ _id: id });
  },
  products: async () => {
    return await Products.getAllProducts();
  },
  insertProduct: async ({ name, description, pictureUrl, price }) => {
    let product = await Products.insertProduct({
      name,
      description,
      pictureUrl,
      price,
    });
    return product;
  },
  updateProduct: async ({ id, name, description, pictureUrl, price }) => {
    let product = await Products.updateProduct({
      _id: id,
      name,
      description,
      pictureUrl,
      price,
    });
    return product;
  },
  deleteProduct: async ({ id }) => {
    let product = await Products.deleteProduct({
      _id: id,
    });
    return product;
  },
};
