const Users = require("../data/models/user");

module.exports = {
  account: async ({ id }) => {
    return await Users.getOneUser({ _id: id });
  },
  accounts: async () => {
    return await Users.getAllUsers();
  },
  login: async ({ username, password }) => {
    const user = await Users.login({ username, password });
    return user.token;
  },
  register: async ({ username, email, password }) => {
    let user = await Users.insertUser({ username, email, password });
    return user.token;
  },
  updateAccount: async ({ username, email, password, roles, user }) => {
    let u = await Users.updateUser({
      _id: user.sub,
      username,
      email,
      password,
      roles,
    });
    return {
      id: u._id,
      username: u.username,
      email: u.email,
      roles: u.roles,
    };
  },
  deleteAccount: async ({ user }) => {
    let u = await Users.removeUser({
      _id: user.sub,
    });
    return {
      id: u._id,
      username: u.username,
      email: u.email,
      roles: u.roles,
    };
  },
};
