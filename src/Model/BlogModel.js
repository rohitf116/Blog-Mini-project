const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    author_Id : {
        type : ObjectId,
        ref : 'author'
    },
    tags : [String],
    category : {
        type : String,
        required : true
    },
    subcategory: [String],
    isPublished : {
        type : Boolean,
        default : false,
        timestamps : true
    },
    publishedAt :{
        type: Date
    },
    isDeleted : {
        type : Boolean,
        default : false,
        timestamps : true
    },
    deletedAt:{
        type : Date
    }
},{timestamps:true})

module.exports = mongoose.model('blog', blogSchema)