const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongooseHidden = require("mongoose-hidden")({
  defaultHidden: { __v: true, hash: true, salt: true, password: true },
});

let orderSchema = new Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  status: {
    type: Boolean,
    required: true,
    trim: true,
    default: false,
  },
});

class Order {
  static async getAllOrders() {
    return await this.find();
  }

  static async getOneOrder(input) {
    return await this.findOne({ _id: input._id });
  }
  static async getAccountOrders(input) {
    return await this.find({ account: input.account });
  }

  static async insertOrder(input) {
    let product = this(input);
    return product.save().then(() => product);
  }

  static async updateOrder(input) {
    let product = await this.findOne({ _id: input._id });
    product.account = input.account;
    product.products = input.products;
    product.status = input.status;
    product.save();
    return product;
  }

  static async deleteOrder(input) {
    let product = await this.findOne({ _id: input._id, account: input.sub });
    return this.deleteOne({ _id: input._id }).then(() => product);
  }
}

orderSchema.loadClass(Order);
orderSchema.plugin(mongooseHidden);

let OrderSchema = mongoose.model("Order", orderSchema);
module.exports = OrderSchema;
