const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorController");
const blogController = require("../controller/blogController");
const auth = require("../middleware/auth");


router.post("/authors",  authorController.createAuthors); //createAuthor APT

router.post("/blogs", auth.authenticate, blogController.createBlog); //createBlogs API

router.post("/login", authorController.loginUser); //login API

router.get("/blogs", auth.authenticate, blogController.getBlogs); //GetBlogs API

router.put("/blog/:blogId", auth.authenticate, auth.authorise, blogController.updateblog); //UpdateBlog API

router.delete("/blog/:blogId", auth.authenticate, auth.authorise, blogController.deleteBlog); //DeleteBlog API

router.delete("/blog", blogController.deleteBlogByQuery); // Delete by query API

module.exports = router;
