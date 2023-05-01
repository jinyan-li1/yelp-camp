const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const users = require("../controllers/users");
const passport = require("passport");

router.route("/register")
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route("/login")
    .get(users.renderLogin)
    .post(passport.authenticate("local", 
    { failureFlash: true, failureRedirect: "/login" }), users.login);

// install the previous version with npm i passport@0.5.0 to ensure this works
router.get('/logout', users.logout);
    
module.exports = router;