const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    role: String,
    status: String,
    phone: String,
    password: String,
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
