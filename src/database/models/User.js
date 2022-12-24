const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: true },
    suffix: { type: String },
    role: { type: Array },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String },
    userName: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);
