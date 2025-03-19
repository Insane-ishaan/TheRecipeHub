const schema = require("./schema");
const initData = require("./init");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/quora");
}

async function insertData() {
  try {
    //TO ADD ON OWNER FIELD TO EACH AN EVERY CARD[OBJ ]
    initData.data = initData.data.map((obj) => ({
      ...obj,
      chef: "67d168d2eb006aa516146e0f",
    }));
    await schema.insertMany(initData.data);
    //initDat is object in which data is its key in key value pair and here we are accesing key data
    console.log("data inserted");
    /*  await schema.deleteMany({});//deleete all data in case of some error
        console.log("data deleted"); */
  } catch (err) {
    console.log(err);
  }
}

insertData();
