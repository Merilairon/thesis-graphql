const mongoose = require("mongoose");
const { Schema, Model } = mongoose;

let productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  pictureUrl: {
    type: String,
    required: false,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
});

class Product extends Model {
  static async getAllProducts() {
    return await this.find();
  }

  static async getOneProduct(input) {
    return await this.findOne({ _id: input._id });
  }

  static async insertProduct(input) {
    let product = this(input);
    return product.save().then(() => product);
  }

  static async updateProduct(input) {
    let product = await this.findOne({ _id: input._id });
    product.name = input.name;
    product.description = input.description;
    product.pictureUrl = input.pictureUrl;
    product.price = input.price;
    product.save();
    return product;
  }

  static async deleteProduct(input) {
    let product = await this.findOne({ _id: input._id });
    return this.deleteOne({ _id: input._id }).then(() => product);
  }
}

productSchema.loadClass(Product);

let ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;
