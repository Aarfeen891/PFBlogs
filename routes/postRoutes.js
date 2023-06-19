const express=require("express");
const postController = require("../controllers/post")
const commentController = require("../controllers/comment")
const protect=require("../middleware/authMiddleware");

const router = express.Router();




router.get("/allPosts",postController.allPosts);
router.post("/post",protect.verifyToken,postController.post);
router.post("/comment",protect.verifyToken,commentController.comment);
router.delete("/deleteComment/:id",protect.verifyToken,commentController.deleteComment);
router.delete("/deletePost/:id",protect.verifyToken,postController.deletePost);
router.put("/updatePost/:id",protect.verifyToken,postController.updatePost);



module.exports = router;