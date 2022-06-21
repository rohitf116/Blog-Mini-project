const express = require('express'); 
const router = express.Router();
const authorController = require('../controller/authorController')
const blogController = require('../controller/blogController')




router.get("/bloging", function  (req,res){
    res.send("Blonging  Api  Strated")
})

router.post("/authors",    authorController.createAuthor )







module.exports =router;
