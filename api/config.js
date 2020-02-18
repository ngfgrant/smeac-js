const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  mongoDbUrl: process.env.MONGODB_URL,
  port: process.env.PORT,
  tidesApiSecret: process.env.TIDES_API
};
