const BlogModel = require("../Model/blogModel");
const AuthorModel = require("../Model/authorModel");

exports.createBlog = async function (req, res) {
  try {
    const fieldAllowed = [
      "title",
      "body",
      "author_Id",
      "tags",
      "category",
      "subcategory",
    ];
    const data = req.body;
    const keyOf = Object.keys(data);
    const receivedKey = fieldAllowed.filter((x) => !keyOf.includes(x));
    console.log(receivedKey);
    if (receivedKey.length) {
      return res
        .status(400)
        .send({ status: "fail", msg: `${receivedKey} field is missing` });
    }
    //key_value validation
    let { title, body, author_Id, tags, category, subcategory } = data;

    //title validation
    if (!/^(?=.{1,50})/.test(title)) {
      return res
        .status(400)
        .send({ status: false, message: `title  can not be blank` });
    }
    //body validation
    if (!/^(?=.{1,1000})/.test(body)) {
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
    if (!/^#?[a-zA-Z0-9 ]+/.test(tags)) {
      //tags validation
      res
        .status(400)
        .send({ status: false, message: `tags  can not be empty` });
      return;
    }
    if (!/[A-Za-z][A-Za-z0-9_]{1,29}/.test(category)) {
      //category validation
      res
        .status(400)
        .send({ status: false, message: `category  can not be empty` });
      return;
    }
    if (!/^#?[a-zA-Z0-9 ]+/.test(subcategory)) {
      //subcategory validation
      res
        .status(400)
        .send({ status: false, message: `subcategory  can not be empty` });
      return;
    }
    let id = await AuthorModel.find({ _id: author_Id }).select({ _id: 1 });
    let blog = id.map((obj) => obj._id.toString());
    if (author_Id == blog) {
      let data = req.body;
      let saveData = await BlogModel.create(data);
      return res.status(201).send({
        status: true,
        msg: saveData,
      });
    } else {
      res.status(400).send({ status: false, msg: "author_id is Invalid" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getBlogs = async function (req, res) {
  try {
    const author_Id=req.query.author_Id
    const savedObj={}
    if(req.query.author_Id) savedObj.author_Id=req.query.author_Id
    if(req.query.category) savedObj.category=req.query.category
    if(req.query.tag) savedObj.tags=req.query.tag
    if(req.query.subcategory) savedObj.subcategory=req.query.subcategory
    console.log(savedObj)
    if (author_Id) {
      if (author_Id.length !== 24) {
        return res
          .status(400)
          .send({ status: "fail", msg: "Invalid author Id" });
      }}
    const foundPost = await BlogModel.find({
      isPublished: true,
      isDeleted: false,
    }).find(savedObj);
    if (foundPost.length == 0) {
      return res.status(400).send({ message: "Post not found" });
    } else {
      res
        .status(200)
        .send({ status: true, results: foundPost.length, msg: foundPost });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.updateblog = async function (req, res) {
  try {
    let data = req.body;
    let blogId = req.params.blogId;

    const { title, body, tags, subcategory } = data;

    // let blog = await BlogModel.findById(blogId);

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
    // console.log(updatedblog);

    res.status(201).send({ status: true, msg: "done", data: updatedblog });
  } catch (err) {
    res.status(500).send({ status: false, msg: "Error", error: err.message });
  }
};
exports.deleteBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let data = await BlogModel.find({ isDeleted: false }).findOneAndUpdate(
      { _id: blogId },
      { $set: { isDeleted: true,deletedAt: Date.now(), } }
    );
    data == null || data == undefined
      ? res.status(404).send({ status: false, msg: "Post not found" })
      : res.status(200).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteBlogByQuery = async function (req, res) {
  try {
    let blogId = req.query;
    console.log(blogId);
    let data = await BlogModel.find({ isDeleted: false }).findOneAndUpdate(
      blogId,
      { $set: { isDeleted: true,deletedAt: Date.now(), } }
    );
    if (data == null || data == undefined) {
      res.status(404).send({ status: false, msg: "Post not found" });
    } else {
      res.status(200).send();
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};
