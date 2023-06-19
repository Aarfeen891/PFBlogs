const Post = require("../models/postModel")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken");




exports.userSignup = async (req,res)=>{

    try {
        const {username,email, password } = req.body
        console.log(req.body);
        const user = new User({username,email, password })
        const saveUser = await user.save()
        res.status(200).json({
            message:"User is Created",
            user:saveUser
        })
    } catch (error) {
        res.status(400).json({
            message:error,
            
        })
    }
}

exports.userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      console.log(user);
  
      if (!user) {
        return res.status(404).json({
          message: "User(Email and Password) doesn't exist",
        });
      }
      console.log(user);
      const isMatch = await user.matchPassword(password);
      console.log(isMatch);
  
      if (!isMatch) {
        return res.status(401).json({
          message: "Incorrect email or password",
        });
      }
  
      const token = jwt.sign({ userId: user._id }, "paypal", { expiresIn: "1h" });
  
      return res.status(200).json({
        message: "Login successful",
        data: {
          user: {
            id: user._id,
            email: user.email,
            // Include any other relevant user data you want to return
          },
          token,
        },
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };