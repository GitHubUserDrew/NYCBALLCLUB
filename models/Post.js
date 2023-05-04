const mongoose = require('mongoose')

const Post = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
      
    },
    image:{
        type:String,

    },
    edited:{
        type:Boolean,
        required:true,
        default:false
    }
    ,
    postedAt:{
        type:Date,
        default:Date.now()

    },
    userId:{
        type: mongoose.Types.ObjectId,
        required:true
    },
    parkId:{
        type:mongoose.Types.ObjectId,
        required:true
    }
})



module.exports = mongoose.model("Post", Post)