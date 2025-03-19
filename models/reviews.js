const mongoose = require("mongoose");
const Schema = mongoose.Schema;
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/quora");
}


let reviewSchema = new Schema({
    Comment : {
        type : String,
    },
    rating :{
        type:Number,
        min:1,
        max:5,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    author : {
        type : Schema.Types.ObjectId,
        ref: "User",
    }
});

console.log("Review schema updated");
const Review = mongoose.model("Review",reviewSchema);
module.exports = Review;