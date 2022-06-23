const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorController");
const blogController = require("../controller/blogController");
const commonMiddleware = require("../middleware/commonMiddleware");
const commonMiddleware1 = require("../middleware/auth")

router.get("/blogging", function (req, res) {
  res.send("Blogging  Api  Strated");
});
router.post("/login",authorController.loginUser)

router.post("/authors", commonMiddleware.authorCreation, authorController.authors);
router.post("/createBlog", commonMiddleware.blogCreation, blogController.createBlog);

router.put("/blog/:blogId",commonMiddleware1.authenticate,commonMiddleware1.authorise, blogController.updateblog);
router.delete("/blog/:blogId",commonMiddleware1.authenticate, commonMiddleware1.authorise, blogController.deleteBlog);
router.delete("/blog", blogController.deleteBlogByQuery);


module.exports = router;
