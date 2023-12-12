const { HTTP_STATUS } = require("../helpers/http-status");

function globalErrorHandler(err, req, res, next) {
  if (res.headerSent) return next(err);
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: err });
}

module.exports = { globalErrorHandler };
