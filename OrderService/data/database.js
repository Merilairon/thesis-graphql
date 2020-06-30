const mongoose = require("mongoose");

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function initializeModels() {
  try {
    require("./models/order");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

module.exports = {
  connectDatabase,
  initializeModels,
};
