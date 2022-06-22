const BlogModel = require('../Model/blogModel')
const AuthorModel=require('../Model/authorModel')

const createBlog = async function(req,res){
    try{
        let authorId=req.body.author_Id
        let id=await AuthorModel.find({_id: authorId}).select({_Id:1})
        let blog=id.map((obj)=>obj._id.toString())
        if (authorId==blog){
        let data = req.body
        let saveData = await BlogModel.create(data)
        res.status(201).send({
            status : true,
            msg : saveData
        
        })}

        else{res.status(400).send({ status: false, msg: "Autho_id is Invalid"})}
    } catch(err){
        res.status(400).send(err.message)
    }
}

exports.blogs = async function (req, res) {
    try {
      const data = req.query;
      const foundPost = await BlogModel.find({
        isPublished: true,
        isDeleted: false,
      }).find(data);
      if (foundPost.length == 0) {
        res.status(400).send("Postt not found");
      } else {
        res.status(200).send({ status: true, msg: foundPost });
      }
    } catch (error) {
      res.status(400).send(err.message);
    }
  };

module.exports.createBlog = createBlog