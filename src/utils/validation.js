/**
 * Checks if a phone number is valid.
 * A valid phone number must meet the following criteria:
 * - Have a length between 4 and 25 characters (inclusive).
 * - Only contain numeric digits, spaces, dots, dashes, parentheses, and commas.
 *
 * @param {string} number - The phone number to validate.
 * @returns {boolean} - Returns true if the phone number is valid, false otherwise.
 */
function isValidPhoneNumber(number) {
  const pattern = /^[0-9\s.\-/(),]+$/;
  return number?.length >= 4 && number.length <= 25 && pattern.test(number);
}

/**
 * Checks if an email address is valid.
 * A valid email address must meet the following criteria:
 * - Have a valid email format.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email address is valid, false otherwise.
 */
function isValidEmail(email) {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(email);
}

/**
 * Checks if a string is url format.
 *
 * URLs starting with either "http://" or "https://" or "ftp://", followed by valid characters
 * @param {string} str - The value to validate.
 * @returns {boolean} - Returns true if given string is an url.
 */
function isValidUrl(str) {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(str);
}

/**
 * Checks if a string is a valid hexadecimal color code.
 *
 * Hexadecimal color codes should start with a '#' followed by either 3 or 6 valid hex characters (0-9, A-F, a-f).
 *
 * @param {string} str - The value to validate.
 * @returns {boolean} - Returns true if the given string is a valid hexadecimal color code.
 */
function isValidHexcolor(str) {
  const hexColorPattern = /^#([A-Fa-f0-9]{3}){1,2}$/;
  return hexColorPattern.test(str);
}

/**
 * Checks if a value has a valid length.
 *
 * @param {string} value - The value to validate.
 * @param {number} length - The length.
 *
 * @returns {boolean} - Returns true if length is same or equal.
 */
function isValidLength(value, length) {
  return value.length >= length;
}

/**
 * Checks if a value has only letters.
 *
 * @param {string} str - The value to validate.
 *
 * @returns {boolean} - Returns true if length is same or equal.
 */
function containsOnlyLetters(str) {
  return /^[A-Za-z]+$/.test(str);
}

/**
 * Checks if a value has only numbers.
 *
 * @param {string} str - The value to validate.
 *
 * @returns {boolean} - Returns true if length is same or equal.
 */
function containsOnlyNumbers(str) {
  return /^\d+$/.test(str);
}

module.exports = {
  containsOnlyLetters,
  containsOnlyNumbers,
  isValidEmail,
  isValidHexcolor,
  isValidLength,
  isValidPhoneNumber,
  isValidUrl,
};
