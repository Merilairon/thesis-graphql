const jwt = require("jsonwebtoken");
const controller = require("../../controller");

module.exports = {
  Account: {
    async __resolveReference(object) {
      return await controller.account({ id: object.id });
    },
  },
  Query: {
    //TODO: catch
    async account(_, { id }) {
      return await controller.account({ id });
    },
    async accounts() {
      return await controller.accounts();
    },
    async currentAccount(_, {}, { user }) {
      return await controller.account({ id: user.sub });
    },
  },
  Mutation: {
    async login(_, { username, password }) {
      try {
        return await controller.login({ username, password });
      } catch (e) {
        throw new Error(
          "An error occured during user authentication, check username & password"
        );
      }
    },
    async register(_, { username, email, password }) {
      try {
        return await controller.register({ username, email, password });
      } catch (e) {
        throw new Error("An error occured during user creation");
      }
    },
    async updateAccount(_, { username, email, password }, { user }) {
      try {
        return await controller.updateAccount({
          username,
          email,
          password,
          user,
        });
      } catch (e) {
        throw new Error("An error occured during user modification");
      }
    },
    async deleteAccount(_, {}, { user }) {
      try {
        return await controller.deleteAccount({ user });
      } catch (e) {
        throw new Error("An error occured during user removal");
      }
    },
  },
};
