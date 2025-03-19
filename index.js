const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const card = require("./router/cardRoute.js");
const review = require("./router/reviewRoute.js");
const user = require("./router/userRoute.js");
const customErr = require("./utils/cutomError.js");
const port = 8080;
const reuireUser = require("./requiringUserModel.js");
const passport = require("passport");
const localStratergy = require("passport-local");
const mongoose = require("mongoose");
const session = require("express-session"); 
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const dbUrl = process.env.MONGO_ATLAS_URL;

async function main() {
  if(mongoose.connection.readyState === 1){
    console.log("Alreaqdy connected to Mongodb");
    return;
  }
  try{
    await mongoose.disconnect();
    await mongoose.connect(dbUrl);
  }
  catch(e){
    console.log(e);
  }
}
main().catch((err) => console.log(err.message));

const store = MongoStore.create({
  mongoUrl : dbUrl,
  touchAfter: 24 * 3600 ,
  crypto: {
    secret: process.env.SECRET,
  }
})

const sessionOption = {
  store:store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  Cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("ejs", ejsMate);
app.use(flash());
app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStratergy(reuireUser.authenticate()));
passport.serializeUser(reuireUser.serializeUser());
passport.deserializeUser(reuireUser.deserializeUser());

app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success");
  res.locals.deleteMsg = req.flash("delete");
  res.locals.errorMsg = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/card", card);
app.use("/card/:id/review", review);
app.use("/", user);

app.use("*", (req, res, next) => {
  next(new customErr(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Default message" } = err;
  res.status(status).render("error.ejs", { message });
});

app.listen(port, () => {
  console.log(`${port} port is listening `);
});