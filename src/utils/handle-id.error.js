const { HttpError } = require("../helpers/http-error");
const { HTTP_STATUS } = require("../helpers/http-status");

/**
 * Validates and handles errors for a given ID.
 *
 * @param {string | undefined} id - The ID to validate.
 * @param {Response} res - Express response object.
 * @returns {void} - Returns early with a JSON error response if the ID is invalid.
 *
 * @example
 * // Usage in a route handler
 *    const id = req.params.id;
 *    validateIDError(id, res);
 */
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
