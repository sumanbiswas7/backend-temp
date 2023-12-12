const { Router } = require("express");

const route = Router();

route.get("/", async (_, res) => {
  res.status(200).json({
    working: true,
    status: 200,
    env: process.env.SECRET || `Key SECRET not found in .env`,
  });
});

module.exports = route;
