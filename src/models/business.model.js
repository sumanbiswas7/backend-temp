const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema({
  title: String,
  type: String,
});

const businessSchema = new mongoose.Schema({
  name: String,
  dateFormat: String,
  timeFormat: String,
  columns: [columnSchema],
});

module.exports = mongoose.model("Business", businessSchema);
