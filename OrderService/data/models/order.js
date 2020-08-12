const mongoose = require("mongoose");
const { Schema, Model } = mongoose;

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

class Order extends Model {
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
    let order = this(input);
    return order.save().then(() => order);
  }

  static async updateOrder(input) {
    let order = await this.findOne({ _id: input._id });
    order.account = input.account;
    order.products = input.products;
    order.status = input.status;
    order.save();
    return order;
  }

  static async deleteOrder(input) {
    let order = await this.findOne({ _id: input._id, account: input.sub });
    return this.deleteOne({ _id: input._id }).then(() => order);
  }
}

orderSchema.loadClass(Order);

let OrderSchema = mongoose.model("Order", orderSchema);
module.exports = OrderSchema;
