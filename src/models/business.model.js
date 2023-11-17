const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  name: String,
  dateFormat: String,
  timeFormat: String,
});

module.exports = mongoose.model("Business", businessSchema);
