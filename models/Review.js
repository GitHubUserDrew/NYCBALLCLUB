const mongoose = require('mongoose')

const Review = new mongoose.Schema({
    title:{
        type:String
    },
    text:{
        type: String, 
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    image:{
        type:String,
    },
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    postedAt:{
        type:Date,
        default:Date.now()

    },
    parkId:{
        type:mongoose.Types.ObjectId,
        required:true
    }
})



module.exports = mongoose.model("Review", Review)