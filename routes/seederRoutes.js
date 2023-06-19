const express=require("express");
const Seeder= require("../controllers/categoryseeder")
const router = express.Router();


router.get("/categorySeeder",Seeder.categorySeeder);



module.exports = router;