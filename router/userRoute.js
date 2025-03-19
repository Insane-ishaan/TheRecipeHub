const express = require("express");
const router = express.Router();
const User = require("../models/users");
const passport = require("passport");
const { redirectUrlAfterLogin } = require("../middlewares");

router.route("/signup")
  .get((req, res) => {res.render("signup.ejs");})
  .post(async (req, res, next) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      //TO REGISTER USER TO DB
      let registeredUser = await User.register(newUser, password);
      req.login(registeredUser, (err) => {
        if (err) {
          next(err);
        }
        req.flash("success", "Welcome to TheRecipeHub");
        res.redirect("/card");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  });

router.route("/login")  
  .get((req, res) => {
    res.render("login.ejs");
  })
  .post(redirectUrlAfterLogin,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    async (req, res) => {
      req.flash("success", "Welcome Back Chef");
      let redirectToOriginalUrlAfterLogin = res.locals.redirectUrl || "/card";
      //IF USER DIRECTLY LOG IN WITHOUT SENDING ANY NEW OR EDIT ROUTE REQUEST SO IT WILL ROUTE TO /CARD
      res.redirect(redirectToOriginalUrlAfterLogin);
    }
  );

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Bye Bye Chef");
    res.redirect("/card");
  });
});

module.exports = router;
