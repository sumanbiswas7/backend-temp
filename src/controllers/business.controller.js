const { ALLOWED_DATE_FORMATS } = require("../constants/allowed-date-formats");
const { HttpError } = require("../helpers/http-error");
const { HTTP_STATUS } = require("../helpers/http-status");
const { Business, Sheet } = require("../models/business.model");
const { isValidMongoId } = require("../utils/handle-id.error");

async function get_business(req, res) {
  const error = new HttpError({});
  const id = req.params.id;

  // dummy wait 2 sec
  // await new Promise((res) => setTimeout(() => res(), 2000));

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
  const error = new HttpError({});
  const id = req.params.id;

  const idErr = isValidMongoId(id);
  if (idErr.valid === false) {
    error.message = idErr?.msg;
    error.status = HTTP_STATUS.BAD_REQUEST;
    return res.status(error.status).json(error);
  }

  const dateFormat = req.body?.dateFormat;
  if (dateFormat && !(dateFormat in ALLOWED_DATE_FORMATS)) {
    error.data = { dateFormat };
    error.message = `Provided date format is not allowed`;
    error.status = HTTP_STATUS.BAD_REQUEST;
    return res.status(error.status).json(error);
  }

  const timeFormat = req.body?.timeFormat;
  if (timeFormat && timeFormat !== "24H" && timeFormat !== "12H") {
    error.data = { timeFormat };
    error.message = `Provided time format is not allowed`;
    error.status = HTTP_STATUS.BAD_REQUEST;
    return res.status(error.status).json(error);
  }

  const result = await Business.updateOne({ _id: id }, req.body);
  res.json(result);
}

async function update_business_sheet(req, res) {
  const error = new HttpError({});
  const id = req.params.id;

  const idErr = isValidMongoId(id);
  if (idErr.valid === false) {
    error.message = idErr?.msg;
    error.status = HTTP_STATUS.BAD_REQUEST;
    return res.status(error.status).json(error);
  }

  const result = await Sheet.updateOne({ _id: id }, req.body);
  res.json(result);
}

async function create_buisness(req, res) {
  const { name } = req.body;
  const error = new HttpError({});

  if (!name) {
    error.message = `Business Name is required got ${name}`;
    error.status = HTTP_STATUS.BAD_REQUEST;
    return res.status(error.status).json(error);
  }

  const result = await Business.create({ name });
  return res.json(result);
}

module.exports = {
  get_business,
  update_business,
  create_buisness,
  update_business_sheet,
};
