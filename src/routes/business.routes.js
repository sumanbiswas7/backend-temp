const { Router } = require("express");
const { get_business } = require("../controllers/business.controller");

const route = Router();

/**
 * --------------------------------------
 *  routes that starts with: /business
 * --------------------------------------
 */
route.get("/:id", get_business);

module.exports = route;
