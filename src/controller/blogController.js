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

        else{res.status(400).send({msg: "AuthorId is Invalid"})}
    } catch(err){
        res.status(400).send(err.message)
    }
}


module.exports.createBlog = createBlog