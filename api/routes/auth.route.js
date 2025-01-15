const express = require("express");
const { signup } = require("../controllers/auth.controller");
const { signin } = require("../controllers/auth.controller");
const { google } = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/google", google);

module.exports = authRouter;
