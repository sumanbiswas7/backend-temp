const { HttpError } = require("../helpers/http-error");
const { HTTP_STATUS } = require("../helpers/http-status");
const Business = require("../models/business.model");
const { isValidMongoId } = require("../utils/handle-id.error");

async function get_business(req, res) {
  const error = new HttpError({});
  const id = req.params.id;

  const idErr = isValidMongoId(id);
  if (idErr.valid === false) {
    error.message = idErr.msg;
    error.status = HTTP_STATUS.BAD_REQUEST;
    return res.status(error.status).json(error);
  }

  const result = await Business.findById(id);
  if (!result) {
    error.message = "No Business with this id found";
    error.status = HTTP_STATUS.NOT_FOUND;
    return res.status(error.status).json(error);
  }

  res.json(result);
}

/**
 * can update: name:str, timeFormat:str, dateFormat:str, columns
 * columns: {title:str, type:str}[]
 *
 * @example
 * // Request Body
 *  {
 *   "name": "Updated Business Name",
 *   "columns": [{ "title": "Updated Column Title", "type": "string" }]
 *   }
 */
async function update_business(req, res) {
  const id = req.params.id;

  const idErr = isValidMongoId(id);
  if (idErr.valid === false) {
    error.message = idErr.msg;
    error.status = HTTP_STATUS.BAD_REQUEST;
    return res.status(error.status).json(error);
  }

  const result = await Business.updateOne({ _id: id }, req.body);
  res.json(result);
}

module.exports = { get_business, update_business };
