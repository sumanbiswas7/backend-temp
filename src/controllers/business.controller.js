const { HttpError } = require("../helpers/http-error");
const { HTTP_STATUS } = require("../helpers/http-status");
const Business = require("../models/business.model");

async function get_business(req, res) {
  const error = new HttpError({});
  const id = (req.params.id || "").toString();

  if (id.length !== 24) {
    error.message = "Invalid id provided";
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

async function update_business(req, res) {
  const error = new HttpError({});
  const id = (req.params.id || "").toString();

  if (id.length !== 24) {
    error.message = "Invalid id provided";
    error.status = HTTP_STATUS.BAD_REQUEST;
    return res.status(error.status).json(error);
  }

  const result = await Business.updateOne({ _id: id }, req.body);
  res.json(result);
}

module.exports = { get_business, update_business };
