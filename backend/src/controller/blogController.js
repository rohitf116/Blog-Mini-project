const BlogModel = require("../Model/blogModel");
const AuthorModel = require("../Model/authorModel");

const titleRegex = /^(?=.{1,50})/;
const bodyRegex = /^(?=.{1,1000})/;
const tagsRegex = /^#?[a-zA-Z0-9 ]+/;
const categoryRegex = /[A-Za-z][A-Za-z0-9_]{1,29}/;
const subcategoryRegex = /^#?[a-zA-Z0-9 ]+/;
exports.createBlog = async function (req, res) {
  try {
    const data = req.body;
    const keyOf = Object.keys(data);
    if (!keyOf.length) {
      return res
        .status(400)
        .send({ status: "fail", msg: `body cannot be empty` });
    }
    //key_value validation
    let { title, body, author_Id, tags, category, subcategory } = data;
    console.log(author_Id, "++++++++");

    //title validation
    if (!titleRegex.test(title)) {
      return res
        .status(400)
        .send({ status: false, message: `title  can not be blank` });
    }
    //body validation
    if (!bodyRegex.test(body)) {
      res
        .status(400)
        .send({ status: false, message: `body  can not be blank` });
      return;
    }
    if (author_Id.length != 24) {
      //author_Id validation
      res.status(400).send({ status: false, message: `put a valid author_Id` });
      return;
    }
    if (!tagsRegex.test(tags)) {
      //tags validation
      res
        .status(400)
        .send({ status: false, message: `tags  can not be empty` });
      return;
    }
    if (!categoryRegex.test(category)) {
      //category validation
      res
        .status(400)
        .send({ status: false, message: `category  can not be empty` });
      return;
    }
    if (!subcategoryRegex.test(subcategory)) {
      //subcategory validation
      res
        .status(400)
        .send({ status: false, message: `subcategory  can not be empty` });
      return;
    }
    let id = await AuthorModel.findOne({ _id: author_Id });

    if (author_Id == id._id.toString()) {
      let data = req.body;
      let saveData = await BlogModel.create(data);
      return res.status(201).send({
        status: true,
        msg: saveData,
      });
    } else {
      res.status(403).send({ status: false, msg: "author_id is Invalid" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getBlogs = async function (req, res) {
  try {
    const author_Id = req.query.author_Id;
    const savedObj = { isPublished: true, isDeleted: false };

    if (req.query.author_Id) savedObj.author_Id = req.query.author_Id;
    if (req.query.category) savedObj.category = req.query.category;
    if (req.query.tag) savedObj.tags = req.query.tag;
    if (req.query.subcategory) savedObj.subcategory = req.query.subcategory;
    if (author_Id) {
      if (author_Id.length !== 24) {
        //
        return res
          .status(400)
          .send({ status: "fail", msg: "Invalid author Id" });
      }
    }
    console.log(savedObj);
    const foundPost = await BlogModel.find(savedObj);
    console.log(foundPost);
    res
      .status(200)
      .send({ status: true, results: foundPost.length, msg: foundPost });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.updateblog = async function (req, res) {
  try {
    let data = req.body;
    let blogId = req.params.blogId;
    const { title, body, tags, subcategory } = data;
    let updatedblog = await BlogModel.find({
      isDeleted: false,
    }).findOneAndUpdate(
      { _id: blogId },
      {
        $addToSet: { tags: tags, subcategory: subcategory },
        $set: {
          title: title,
          body: body,
          publishedAt: Date.now(),
          isPublished: true,
        },
      },
      { new: true }
    );
    console.log(updatedblog);
    if (!updatedblog)
      return res.status(404).send({ status: false, msg: "Post not found" });
    res.status(200).send({ status: true, msg: "true", data: updatedblog });
  } catch (err) {
    res.status(500).send({ status: false, msg: "Error", error: err.message });
  }
};
exports.deleteBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    console.log(blogId);
    let data = await BlogModel.findOneAndUpdate(
      { _id: blogId, isDeleted: false },
      { $set: { isDeleted: true, deletedAt: Date.now() } }
    );
    data == null || data == undefined
      ? res.status(404).send({ status: false, msg: "Post not found" })
      : res.status(200).send("");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteBlogByQuery = async function (req, res) {
  try {
    const author_Id = req.query.author_Id;
    const savedObj = {
      isDeleted: false,
    };
    if (req.query.author_Id) savedObj.author_Id = req.query.author_Id;
    if (req.query.category) savedObj.category = req.query.category;
    if (req.query.tag) savedObj.tags = req.query.tag;
    if (req.query.subcategory) savedObj.subcategory = req.query.subcategory;
    if (req.query.isPublished) savedObj.isPublished = req.query.isPublished;
    const size = Object.keys(savedObj).length;
    if (size < 1) {
      return res.status(400).send({
        status: "false",
        msg: "Please provide valiid query to delete",
      });
    }

    if (author_Id) {
      if (author_Id.length !== 24) {
        return res
          .status(400)
          .send({ status: "false", msg: "Invalid author Id" });
      }
    }
    let data = await BlogModel.findAndUpdate(savedObj, {
      $set: { isDeleted: true, deletedAt: Date.now() },
    });
    if (data == null || data == undefined) {
      return res
        .status(404)
        .send({ status: "false", msg: "Resource not found" });
    }

    res.status(200).send("");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
