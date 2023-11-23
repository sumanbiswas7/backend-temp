const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    businessID: String, // could be null depending on user role
    role: String, // Super Admin | Admin | User
    email: String,
    password: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
