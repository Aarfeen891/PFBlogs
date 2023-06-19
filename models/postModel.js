const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    commentsId:[
      {type: mongoose.Schema.Types.ObjectId, 
      ref: "Comment", 
      }
    ],
    categoriesId:  {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Categorie", 
      required: true 
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
  },
  {
    timestamps: true,
  }
);


const Post = mongoose.model("Post", postSchema);

module.exports = Post;