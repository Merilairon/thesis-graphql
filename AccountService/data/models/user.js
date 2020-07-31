const mongoose = require("mongoose");
const { Model, Schema } = mongoose;
const mongooseHidden = require("mongoose-hidden")({
  defaultHidden: { __v: true, hash: true, salt: true, password: true },
});
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  username: String,
  roles: { type: [String], default: [] },
  email: String,
  hash: String,
  salt: String,
});

class User extends Model {
  static async getAllUsers() {
    return await this.find();
  }
  static async getOneUser(input) {
    return await this.findOne({ _id: input._id });
  }
  static async insertUser(input) {
    let user = this(input);
    user.setPassword(input.password);
    return user.save().then(() => user);
  }
  static async updateUser(input) {
    let user = await this.findOne({ _id: input._id });
    user.username = input.username;
    user.email = input.email;
    user.setPassword(input.password);
    user.roles = input.roles;
    return user.save().then(() => {
      return { ...user.toJSON(), token: user.generateJWT() };
    });
  }
  static async removeUser(input) {
    let user = await this.findOne({ _id: input._id });
    return this.deleteOne({ _id: input._id }).then(() => user);
  }

  static async login(input) {
    let user = await this.findOne({ username: input.username });
    return user.validatePassword(input.password)
      ? { ...user.toJSON(), token: user.generateJWT() }
      : null;
  }

  setPassword(password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
      .toString("hex");
  }

  validatePassword(password) {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
      .toString("hex");
    return this.hash === hash;
  }

  generateJWT() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        username: this.username,
        roles: this.roles,
      },
      process.env.JWT_SECRET,
      {
        algorithm: "HS256",
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
        subject: `${this._id}`,
      }
    );
  }
}

userSchema.loadClass(User);
userSchema.plugin(mongooseHidden);

module.exports = mongoose.model("User", userSchema);
