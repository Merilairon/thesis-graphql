const jwt = require("jsonwebtoken");
const Users = require("../../data/models/user");

module.exports = {
  Account: {
    async __resolveReference(object) {
      return await Users.getOneUser({ _id: object.id });
    },
  },
  Query: {
    async account(_, { id }) {
      return await Users.getOneUser({ _id: id });
    },
    async accounts() {
      return await Users.getAllUsers();
    },
    async currentAccount(_, {}, { user }) {
      return await Users.getOneUser({ _id: user.sub });
    },
  },
  Mutation: {
    //TODO: Rewrite
    async login(_, { username, password }) {
      const user = await Users.login({ username, password });
      return user.token;
    },
    async register(_, { username, email, password }) {
      try {
        let user = await Users.insertUser({ username, email, password });
        return user.token;
      } catch (e) {
        throw new Error("An error occured during user creation");
      }
    },
    async updateAccount(_, { username, email, password }, { user }) {
      try {
        let u = await Users.updateUser({
          _id: user.sub,
          username,
          email,
          password,
        });
        return {
          id: u._id,
          username: u.username,
          email: u.email,
        };
      } catch (e) {
        throw new Error("An error occured during user modification");
      }
    },
    async deleteAccount(_, {}, { user }) {
      try {
        let u = await Users.removeUser({
          _id: user.sub,
        });
        //TODO: Move this to a different method
        return {
          id: u._id,
          username: u.username,
          email: u.email,
        };
      } catch (e) {
        throw new Error("An error occured during user removal");
      }
    },
  },
};
