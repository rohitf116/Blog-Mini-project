const jwt = require("jsonwebtoken");
const BlogModel = require("../Model/blogModel");
exports.authenticate = function (req, res, next) {
  try {
    //check the token in request header
    //validate this token
    // console.log(" is die authenticate ");
    let token = req.headers["x-api-key"];
    if (!token)
      return res.send({
        status: false,
        msg: "token is not present in the headers",
      });

    const decodedToken = jwt.verify(token, "functionup-radon");
    console.log(decodedToken)
    if (!decodedToken)
      return res.send({ status: false, msg: "token is not valid" });

    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.authorise = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    const decodedToken = jwt.verify(token, "functionup-radon");
    let currentPost = req.params.blogId;
    let userLoggedIn = decodedToken.userId;
    const isCorrect = await BlogModel.findById(currentPost).select({
      author_Id: 1,
      _id: 0,
    });
    // console.log(isCorrect);
    const idOf = isCorrect.author_Id.toString();
    // console.log(idOf);
    if (userLoggedIn == idOf) {
      next();
    } else {
      res
        .status(403)
        .send({ status: "fail", msg: "user is nott allowed to modify" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
