const { Router } = require("express");

const route = Router();
const userController = require("../controllers/user.controller");

route.post("/superadmin/create-user", userController.create_user);
route.get("/superadmin/accounts", userController.get_user_accounts);
route.post("/superadmin/update-user", userController.update_user);

module.exports = route;
