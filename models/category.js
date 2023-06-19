const mongoose = require("mongoose");
const { Schema } = mongoose;
const category = new Schema({  
  category: {
    type: String,
    enum : ["Informative","Education","Entertainment","Funny"],
    require: true,
  },

});
const categorie = mongoose.model("Categorie", category);

module.exports = categorie;
