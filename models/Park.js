const mongoose = require("mongoose")
require("dotenv").config()


const Post = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    image:{
        type:String,

    },
    postedAt:{
        type:Date,
        default:Date.now()

    },
    userId:{
        type: mongoose.Types.ObjectId,
        required:true
    }
})


const Review = new mongoose.Schema({
    title:{
        type:String
    },
    text:{
        type: String, 
    },
    rating:{
        type:Number
    }
})

const schema = new mongoose.Schema({
    lat :{
        type:Number,
        required:true
    },
    long:{
        type:Number,
        required:true
    },
    name :{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required: true,
        default:process.env.DEFAULT_PARK_IMG
    },
    posts:{
        type:[Post],
        required:true,
        default:[]
    },
    reviews:{
        type:[Review],
        required:true,
        default:[]
    }
})



module.exports = mongoose.model("Park", schema)