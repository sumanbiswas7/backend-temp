const { HttpError } = require("../helpers/http-error");
const { HTTP_STATUS } = require("../helpers/http-status");
const { Sheet, Field } = require("../models/business.model");
const { isValidMongoId } = require("../utils/handle-id.error");

// NOT WORKING when updating fields
async function add_field(req, res) {
  // Add new filed by sheet id
  const error = new HttpError({});
  const id = req.params.id;

  const idErr = isValidMongoId(id);
  if (idErr.valid === false) {
    error.message = idErr?.msg;
    error.status = HTTP_STATUS.BAD_REQUEST;
    return res.status(error.status).json(error);
  }

  // Update Sheet fields:[] from sheet id
  const result = await Sheet.updateOne({ _id: id }, req.body);
  res.json(result);
}

module.exports = { add_field };
