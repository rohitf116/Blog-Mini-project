const jwt =require("jsonwebtoken");
const AuthorModel = require('../Model/authorModel')

const authors = async function(req,res){
    try{
        let data = req.body
        let saveData = await AuthorModel.create(data)
        res.status(201).send({
            status : true,
            msg : saveData
        })
    } catch(err){
        res.status(400).send(err.message)
    }
}

exports.loginUser = async function (req, res) {
    try{
    let email = req.body.emailId;
    let password =req.body.password;

    let  user = await AuthorModel.findOne({emailId :email, password:password});
    if(!user){
       res.status(404).send({msg:"User not  found"})

    }else{
        let token = jwt.sign(
            {
              userId: user._id.toString(),
              batch: "Room-24",
              organisation: "BlogProject",
            },
            "functionup-radon"
          );
          res.setHeader("x-api-key", token);
          res.send({ status: true, token: token });
        };
       }catch (err) {
        res.status(500).send(err.message);
      }
    }



module.exports.authors = authors