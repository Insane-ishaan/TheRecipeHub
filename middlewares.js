const schema = require("./models/schema.js");
const Review = require("./models/reviews.js");
const customErr = require("./utils/cutomError.js");
let { serverValidationSchema } = require("./serverValidation.js");
let { serverValidationSchemaReviews } = require("./serverValidation.js");

module.exports.isLoogedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    /*WE CREATE A SEPARATE MIDDLEWARE FOR THIS FUNCTIONAITY(to redirect to that same page url for which user login) BECOZ IF 
     WE DIRECTLY REQUIRE THIS MIDDLEWARE TO LOGIN ROUTE ... THE PASSPORT BY DEFAULT SET THIS req.session.redirectUrl TO UNDEFINED */
    req.flash("error", "User must be logged in");
    return res.redirect("/login");
  }
  next();
};

module.exports.redirectUrlAfterLogin = (req, res, next) => {
  if (req.session.redirectUrl) {
    /* SO HERE WE CRETE A SEPARATE URL FOR THIS REDIRECT URL WHERE WE RE INITALIZE THIS req.session.redirectUrl TO res.locals.redirectUrl
        WHICH CANNOT BE RESET BECOZ PASSPORT DON'T HAVE AUTHORITY TO RESET LOCALS AND REQUIRE THIS MIDDLEWARE TO LOGIN ROUTE */
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
  /*THIS MAKES CONVIENICE TO USER THAT WHENEVER  HE/SHE MAKE REQUEST TO ACCESS CREATE OR EDIT ROUTE THEN AFTER LOGIN THIS MIDDLEWARE WILL
  REDIRECT THEM TO THAT ACESSING PAGE INSTEAD OF INDEX ROUTE */
};

//MIDDLEWARE TO CHEF WHEATHER AUTHORIZED CHEF WAS ACCESSING THE ITS CARD
module.exports.isChef =async (req,res,next) => {
  let{id} = req.params;
  let card = await schema.findById(id);
  if(!card.chef.equals(res.locals.currUser._id)){
    req.flash("error","you are not a owner of this Card");
    return res.redirect(`/card/${id}`);
  }
  next();
} 

//MIDDLEWARE TO CHECK WHEATHER AUTHORIZED AUTHOR ACCESSING ITS REVIEW 
module.exports.isAuthor =async (req,res,next) => {
  let{reviewId , id} = req.params;
  let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error","you are not a owner of this Review");
    return res.redirect(`/card/${id}`);
  }
  next();
} 

module.exports.serverValidation = (req, res, next) => {
  let { error } = serverValidationSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message);
    throw new customErr(400, errMsg);
  } else {
    next();
  }
};

module.exports.serverValidationReviews = (req, res, next) => {
  let { error } = serverValidationSchemaReviews.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message);
    throw new customErr(400, errMsg);
  } else {
    next();
  }
};
