const { Router } = require("express");
const route = Router();

const { get_business } = require("../controllers/business.controller");
const { update_business } = require("../controllers/business.controller");

/**
 * --------------------------------------
 *  routes that starts with: /business
 * --------------------------------------
 */
route.get("/:id", get_business);
route.put("/:id", update_business);

module.exports = route;
