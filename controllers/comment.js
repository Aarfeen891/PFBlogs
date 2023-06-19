const Comment = require("../models/postComments")
const Post = require("../models/postModel")



exports.comment = async (req,res)=>{

    try {
        const { comment,postId} = req.body
        let userId = req.userId
        const comments = new Comment({ comment, userId,postId} )
        const saveComment = await comments.save()
        if(saveComment){
            let updatePost = await Post.findByIdAndUpdate( postId,
                { $push: {  commentsId: saveComment._id } },
                { new: true })
            res.status(200).json({
                message:"Comment is Created",
                comment:saveComment
            })
        }
       
    } catch (error) {
        res.status(400).json({
            message:error,
            
        })
    }
}

exports.deleteComment = async (req, res) => {
    try {
      const commentId = req.params.id;
      

      const comment = await Comment.findById(commentId);

    
      let commentUserid = comment.userId.toString()
      
       if(commentUserid===req.userId) {
        const comment = await Comment.findByIdAndDelete(commentId);
        return res.status(200).json({
          message: "comment deleted successfully",
          comment
        })
      } else {
        return res.status(200).json({
          message: "user unathorized",
        });
      }
    } catch (error) {
      console.error(error); // Log the error message for debugging
      return res.status(500).json({
        message: "Server error",
      });
    }
  };
