const mongoose = require("mongoose");
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

  if (id.length !== 24) {
    error.message = "Provided ID length is not 24";
    error.status = HTTP_STATUS.BAD_REQUEST;
    return res.status(error.status).json(error);
  }

  if (id.match(/^[0-9a-fA-F]{24}$/) === false) {
    error.message = "Seems provided ID is not correct";
    error.status = HTTP_STATUS.BAD_REQUEST;
    return res.status(error.status).json(error);
  }

  const validMongoId = mongoose.Types.ObjectId.isValid(stringId);
  if (validMongoId !== true) {
    error.message = "Invalid mongoDB ID provided";
    error.status = HTTP_STATUS.BAD_REQUEST;
    error.data = { validMongoId };
    return res.status(error.status).json(error);
  }
}

/**
 * Checks if the provided ID is a valid MongoDB ObjectId.
 *
 * @param {string|undefined} id - The ID to be validated.
 * @returns {Object} - An object indicating whether the ID is valid or not.
 * @property {boolean} valid - Indicates if the ID is valid (true) or not (false).
 * @property {string} msg - A message providing details about the validation result.
 *                         If valid is false, msg describes the reason for invalidity.
 */
function isValidMongoId(id) {
  const stringId = (id || "").toString();

  if (stringId.length !== 24) {
    return { valid: false, msg: "ID length should be 24" };
  }

  if (!stringId.match(/^[0-9a-fA-F]{24}$/)) {
    return { valid: false, msg: "ID is not matching the expected format" };
  }

  const validMongoId = mongoose.Types.ObjectId.isValid(stringId);
  if (!validMongoId) {
    return { valid: false, msg: "Invalid MongoDB ID" };
  }

  return { valid: true, msg: "ID is valid" };
}

module.exports = { validateIDError, isValidMongoId };
