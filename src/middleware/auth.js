const jwt = require("jsonwebtoken");
const BlogModel = require("../Model/blogModel");
exports.authenticate = function (req, res, next) {
  try {
    //check the token in request header
    //validate this token
    // console.log(" is die authenticate ");
    let token = req.headers["x-api-key"];
    if(!token){
      res.status(404).send({status:false, msg: "token is not present in headers"})
    } else{
      const decodedToken = jwt.verify(token,"functionup-radon",{ algorithm: "RS256" },
      function(err,token){
        if(err){
          return null
        } else{
          return token
        }
      })
    if(decodedToken == null){
      return res.status(401).send({status: false,msg:"invalid token"})
    }
  }
    next()
} catch(err){
     res.status(500).send(err.message)
}
}

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

exports.checkFor = function (req, res, next) {
  try{
  const token = req.headers["x-api-key"];
  const author_Id = req.body.author_Id;
  if (!token) {
    res
      .status(400)
      .send({ status: "fail", msg: "JWT must be present in here" });
  } else {
    const decodedToken = jwt.verify(token,"functionup-radon")
      
    if (decodedToken == null) {
      return res.status(403).send({ status: "fail", msg: "Invalid jwt token" });
    }
    const userLoggedIn = decodedToken.userId;
    // console.log(userLoggedIn, "+++++++++++++++");
    // console.log(author_Id, "+++++++++++++++");
    // console.log(author_Id == userLoggedIn);
    (author_Id == userLoggedIn)
      ? next()
      : res.status(400).send({
          status: "fail",
          msg: `This user is not allowed to create blog using someone else Id`,
        });
  }
  }catch(err){
    res.status(500).send(err.message)

  }
};
