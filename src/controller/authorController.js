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


module.exports.authors = authors