if(process.env.NODE_ENV != "production"){
  require('dotenv').config()
}

const express = require("express");
const router = express.Router({ mergeParams: true });
const controller = require("../controller/cardCallBacks.js");
const {storage} = require("../cloudConfig.js");
const multer = require('multer');
const upload = multer({storage});
const { isLoogedIn, isChef, serverValidation } = require("../middlewares.js");


function errorHandler(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}

router.route("/")
  .get(serverValidation, errorHandler(controller.renderIndex))
  .post( isLoogedIn,upload.single("card[avtar]"), serverValidation,errorHandler(controller.CreateNewCard));

//NEW ROUTE
router.get("/new", isLoogedIn, controller.renderNewForm);

//EDIT ROUTE
router.get(
  "/edit/:id",
  isLoogedIn,
  isChef,
  serverValidation,
  errorHandler(controller.renderEditForm)
);

router.route("/:id")
  .get(serverValidation, errorHandler(controller.viewRoute))
  .put(isLoogedIn,upload.single("card[avtar]"),isChef,serverValidation,errorHandler(controller.updateRoute))
  .delete(isLoogedIn,isChef,serverValidation,errorHandler(controller.destroyRoute));

module.exports = router;
