const Orders = require("../data/models/order");

module.exports = {
  order: async ({ id }) => {
    return await Orders.getOneOrder({ _id: id });
  },
  orders: async () => {
    return await Orders.getAllOrders();
  },
  accountOrders: async ({ account }) => {
    return await Orders.getAccountOrders({ account: account.id });
  },
  insertOrder: async ({ products, account }) => {
    console.log(products, account);
    let order = await Orders.insertOrder({
      account,
      products,
      status: false,
    });
    return order;
  },
  updateOrder: async ({ id, account, products, status }) => {
    let order = await Orders.updateProduct({
      _id: id,
      account,
      products,
      status,
    });
    return order;
  },
  deleteOrder: async ({ id, user }) => {
    let order = await Orders.deleteOrder({
      _id: id,
      account: user.sub,
    });
    return order;
  },
};
