const schema = require("../models/schema");

module.exports.renderIndex = async (req, res) => {
  let allData = await schema.find({});
  res.render("home.ejs", { allData });
};

module.exports.renderNewForm = (req, res) => {
  /* if(!req.isAuthenticated()){
    req.flash("error","User must be lgged in");
    return res.redirect("/card");
    } */
  res.render("new.ejs");
};

module.exports.CreateNewCard = async (req, res, next) => {
 let newCard = req.body.card; 
  let newData = new schema(newCard);
  let url = req.file.path;
  let filename = req.file.filename;
  newData.chef = req.user._id; //TO SAVE CURRENT USER _ID AS PASSPORT BY-DEFAULT SAVE CURENT USER INFO IN REQ OBJ
  newData.avtar = {url,filename};
  await newData.save();
  req.flash("success", "New Card Addded Sucessfully"); 
  res.redirect("/card");
};

module.exports.viewRoute = async (req, res, next) => {
  let { id } = req.params;
  let getData = await schema
    .findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("chef");
  if (!getData) {
    req.flash("error", "Requested Card Not Found");
    res.redirect("/card");
  }
  res.render("detail.ejs", { getData });
};

module.exports.renderEditForm = async (req, res, next) => {
  let { id } = req.params;
  let getDataToBeEdit = await schema.findById(id);
  let modifyUrl = getDataToBeEdit.avtar.url
  let modifyImg = modifyUrl.replace("/upload","/upload/w_250/q_20");
  if (!getDataToBeEdit) {
    req.flash("error", "Requested Card not found");
    res.redirect("/card");
  }
  res.render("edit.ejs", { getDataToBeEdit, modifyImg});
};

module.exports.updateRoute = async (req, res, next) => {
  let { id } = req.params;
  let { date: newDate } = req.params; //TO DESTRUCTURE DATE FROM URL
  newDate = new Date(); //SET THE DATE TO NEW(CURRENT) DATE
  req.body.card.date = newDate; //ADD ON THIS NEW DATE TO CARD
  let updatedData = await schema.findByIdAndUpdate(
    id,
    { ...req.body.card },
    { runValidators: true, new: true }
  ); //HERE WE DESCONSTRUCT(...) THE CARDS FROM REQ.BODY AND GET EACH ELEMENT IN IT
  if(typeof req.file !== "undefined"){
    let filename = req.file.filename;
    let url = req.file.path;
    updatedData.avtar = {url,filename};
    await updatedData.save();
  }
  req.flash("success", "Card Edited Sucessfully");
  res.redirect(`/card/${id}`);
};

module.exports.destroyRoute = async (req, res, next) => {
  let { id } = req.params;
  let dataToBeDelete = await schema.findByIdAndDelete(id);
  console.log(`${id} DATA SUCCESSFULLY DELETED`);
  req.flash("delete", "Card Deleted Sucessfully");
  res.redirect("/card");
};
