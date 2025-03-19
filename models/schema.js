const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/quora");
}

const dishSchema = new Schema({
  avtar: {
    url:String,
    filename:String,
  },
  chef: {
    type: Schema.Types.ObjectId,
      ref: "User",
  },
  dishname: {
    type: String,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  msg: {
    type: String,
    default: "Description Not Found",
    minLength: [10, "Minimun 10 word Description is required"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  Ing: {
    type: String,
    set: (v) => (v === "" ? "Ingredient Are Not Defined" : v),
    default: "Ingredient Are Not Defined",
  },
  duration: {
    type: Number,
    set: (v) => (v === "" ? "Duration Not defined" : v),
  },
  req: {
    type: String,
    set: (v) => (v === "" ? "Oops Requirements Not Available at a Monmet" : v),
    default: "Oops Requirements Not Available at a Monmet",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

//POST MONGOOOSE MIDDLEWARE TO DELETE ALL REVIEWS AS WELL WHEN THE CARDR WAS DELETED
dishSchema.post("findOneAndDelete", async (card) => {
  if (card) {
    await Review.deleteMany({ _id: { $in: card.reviews } });
  }
});

console.log("Main schema updated");
const Card = mongoose.model("Card", dishSchema);
module.exports = Card;
