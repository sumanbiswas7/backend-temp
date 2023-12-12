const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const createHash = async (data) => {
  return await bcrypt.hash(data, SALT_ROUNDS);
};

const compareHash = async (plainText, hash) => {
  return await bcrypt.compare(plainText, hash);
};

module.exports = { createHash, compareHash };
