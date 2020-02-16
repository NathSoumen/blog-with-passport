const mongoose = require('mongoose')
const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    doc:{
        type:String,
        required:true
    },
    image: String,
   user :{
       type:mongoose.Schema.Types.ObjectId,
       rel:"user"
   }
})

const Blog = mongoose.model("blog",BlogSchema)

module.exports = Blog