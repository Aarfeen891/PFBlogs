const express=require("express");
const userController= require("../controllers/userController")
const router = express.Router();




router.post("/userSignup",userController.userSignup);
router.post("/userLogin",userController.userLogin);



module.exports = router;