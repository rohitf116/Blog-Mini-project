const express = require('express'); 
const router = express.Router();
const authorController = require('../controller/authorController')
const blogController = require('../controller/blogController')




router.get("/blogging", function  (req,res){
    res.send("Blogging  Api  Strated")
})

router.post("/authors", authorController.authors )
router.post("/createBlog", blogController.createBlog )
router.get("/blogs", blogController.getBlogs)

router.put("/blog/:blogId", blogController.updateblog)
router.delete("/blog/:blogId", blogController.deleteBlog)
router.delete("/blog", blogController.deleteBlogByQuery)





module.exports =router;
