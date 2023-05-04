const mongoose = require("mongoose")
require("dotenv").config()








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
    image:{
        type:String,
        required: true,
        default:process.env.DEFAULT_PARK_IMG
    }
})



module.exports = mongoose.model("Park", schema)