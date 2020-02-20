const mongoose = require("mongoose");
const { mongoDbUrl } = require("./config");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true
});
