const Post = require("../models/postModel")
const Comment = require("../models/postComments")


exports.post = async (req,res)=>{

    try {
        const {title,description,commentsId,categoriesId} = req.body
        console.log(req.body);
        let userId = req.userId
        console.log(req.userId);
        const post = new Post({title,description,commentsId,categoriesId,userId})
        const savePost = await post.save()
        res.status(200).json({
            message:"Post is Created",
            post:savePost
        })
    } catch (error) {
        res.status(400).json({
            message:error,
            
        })
    }
}

exports.allPosts = async (req,res)=>{

    try {
        
        const allPost = await Post.find().populate("commentsId")
       console.log(allPost);
        res.status(200).json({
            message:"All Posts",
            All_Posts:allPost
        })
    } catch (error) {
        res.status(400).json({
            message:error,
            
        })
    }
}

exports.deletePost = async (req, res) => {
    try {
      const postId = req.params.id;
      console.log(postId);
      const post = await Post.findById(postId);

      console.log(post);
      console.log(post.userId,req.userId);
      let postUserid = post.userId.toString()
       console.log(postUserid);
       if(postUserid===req.userId) {
        const post = await Post.findByIdAndDelete(postId);
         if(post){
           let commentDelete = await Comment.deleteMany({ postId:postId  })
            return res.status(200).json({
            message: "post deleted successfully",
           
          })
         }
        
      }else{
        return res.status(400).json({
            message: "user anauthorized",
          })
        };
      }
    catch (error) {
      console.error(error); // Log the error message for debugging
      return res.status(500).json({
        message: "Server error",
      });
    }
  };

exports.updatePost = async (req, res) => {
    try {
      const { id } = req.params;
      
      const options = { new: true }; // Return the updated record
  
      
      const post = await Post.findById(id);
      
      console.log(post);
      console.log(post.userId,req.userId);
      let postUserid = post.userId.toString().split(" ")

  
      if(postUserid[0]===req.userId) {
        const postUpdate = await Post.findByIdAndUpdate(id, {...req.body}, options);
  
        return res.status(200).json({
          message: "post update successfully",
          post: postUpdate,
        })
      }
  
      return res.status(200).json({
        message: "user anauthorized",
       
      });
    } catch (error) {
      console.error(error); // Log the error message for debugging
      return res.status(500).json({
        message: "Server error",
      });
    }
  };