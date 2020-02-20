const mongoose = require("mongoose");

const administrationSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  reporter: {
    type: String,
    required: true
  },
  mechanicAware: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});

const Admin = mongoose.model("Admin", administrationSchema);

module.exports = Admin;
