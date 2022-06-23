const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorController");
const blogController = require("../controller/blogController");
const commonMiddleware = require("../middleware/commonMiddleware");
const auth = require("../middleware/auth");
const validator = require("../validator/validation");

router.get("/blogging", function (req, res) {
  res.send("Blogging  Api  Strated");
});
router.post("/login", authorController.loginUser);

router.post(
  "/authors",
  validator.authorValidation,
  commonMiddleware.authorCreation,
  authorController.authors
);
router.post(
  "/createBlog",
  auth.authenticate,
  validator.blogValidation,
  commonMiddleware.blogCreation,
  blogController.createBlog
);

router.put(
  "/blog/:blogId",
  auth.authenticate,
  auth.authorise,
  blogController.updateblog
);
router.delete(
  "/blog/:blogId",
  auth.authenticate,
  auth.authorise,
  blogController.deleteBlog
);
router.delete("/blog", blogController.deleteBlogByQuery);
validator.authorValidation;

module.exports = router;
