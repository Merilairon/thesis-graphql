const jwt = require("jsonwebtoken");
const controller = require("../../controller");

module.exports = {
  Account: {
    async __resolveReference(object) {
      return await controller.account({ id: object.id });
    },
  },
  Query: {
    async account(_, { id }) {
      try {
        return await controller.account({ id });
      } catch (e) {
        throw new Error("An error occured during user retrieval");
      }
    },
    async accounts() {
      try {
        return await controller.accounts();
      } catch (e) {
        throw new Error("An error occured during user retrieval");
      }
    },
    async currentAccount(_, {}, { user }) {
      try {
        return await controller.account({ id: user.sub });
      } catch (e) {
        throw new Error("An error occured during user retrieval");
      }
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
    //TODO: Test: only allow admin or own account, if roles are provided only allow admin
    async updateAccount(_, { id, username, email, password, roles }, { user }) {
      try {
        return await controller.updateAccount({
          id,
          username,
          email,
          password,
          roles,
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
