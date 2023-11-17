const { HttpError } = require("../helpers/http-error");
const { HTTP_STATUS } = require("../helpers/http-status");

function validateIDError(id, res) {
  const error = new HttpError({});
  const stringId = (id || "").toString();

  if (stringId.length !== 24) {
    error.message = "Invalid id provided";
    error.status = HTTP_STATUS.BAD_REQUEST;
    return res.status(error.status).json(error);
  }
}

module.exports = { validateIDError };
