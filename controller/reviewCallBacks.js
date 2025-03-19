const Review = require("../models/reviews.js");
const schema = require("../models/schema.js");

module.exports.createReview = async (req, res) => {
  const getReview = await schema.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  getReview.reviews.push(newReview);

  await newReview.save().catch((err) => console.log(err));
  await getReview.save().catch((err) => console.log(err));

  req.flash("success", "New Review Created Succesfully");
  res.redirect(`/card/${getReview.id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await schema.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  req.flash("delete", "Review Deleted Successfully");
  let redirectToOriginalUrlAfterLogin = res.locals.redirectUrl || `/card/${id}`;
  res.redirect(redirectToOriginalUrlAfterLogin);
};
