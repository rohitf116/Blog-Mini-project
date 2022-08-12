const express = require("express");
const router = express.Router();
const {createAuthors,loginUser} = require("../controller/authorController");
const {getBlogs,updateblog,deleteBlog,deleteBlogByQuery} = require("../controller/blogController");
const {authenticate,authorise} = require("../middleware/auth");


router.post("/authors",  createAuthors); //createAuthor APT

router.post("/blogs", authenticate, createBlog); //createBlogs API

router.post("/login", loginUser); //login API

router.get("/blogs", authenticate, getBlogs); //GetBlogs API

router.put("/blog/:blogId", authenticate, authorise, updateblog); //UpdateBlog API

router.delete("/blog/:blogId", authenticate, authorise, deleteBlog); //DeleteBlog API

router.delete("/blog", deleteBlogByQuery); // Delete by query API

module.exports = router;
