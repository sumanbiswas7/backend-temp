const { Router } = require("express");
const route = Router();

const {
  get_business,
  create_buisness,
  update_business_sheet,
} = require("../controllers/business.controller");
const { update_business } = require("../controllers/business.controller");
const { add_field } = require("../controllers/sheet.controller");

/**
 * --------------------------------------
 *  routes that starts with: /business
 * --------------------------------------
 */
route.get("/:id", get_business);
route.put("/:id", update_business);
route.put("/sheet/:id", update_business_sheet);
route.post("/create", create_buisness);

// Not Working
route.put("/add-field/:id", add_field);

module.exports = route;
