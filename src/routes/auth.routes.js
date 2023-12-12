const { Router } = require("express");

const route = Router();
const authController = require("../controllers/auth.controller");

route.post("/login", authController.login_user);

// DELETE LATER
route.post("/create-user-test", authController.create_user_test);
route.delete("/delete-user-test", authController.delete_user_test);

module.exports = route;
