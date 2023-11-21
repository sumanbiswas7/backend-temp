const mongoose = require("mongoose");

const fieldSchema = {
  title: String,
  type: String,
};

const sheetSchema = new mongoose.Schema(
  {
    orientation: String,
    noOfLines: Number,
    size: String,
    fields: [fieldSchema],
  },
  { timestamps: true }
);

const businessSchema = new mongoose.Schema(
  {
    name: String,
    dateFormat: String,
    timeFormat: String,
    sheet: sheetSchema,
  },
  { timestamps: true }
);

const Business = mongoose.model("Buisness", businessSchema);
const Sheet = mongoose.model("Sheet", sheetSchema);
const Field = mongoose.model("Field", fieldSchema);

module.exports = { Business, Sheet, Field };
