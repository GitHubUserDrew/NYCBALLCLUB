const mongoose = require('mongoose');
require("dotenv").config();

const userSchema = new mongoose.Schema({
    username :{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    isAdmin:{
        required:true,
        default:false,
        type:Boolean
    },
    pfp:{
        required:true,
        type:String,
        default:process.env.PFP
    },
    name:{
        required:true,
        type:String,
        default:"User"  
    }
})

const User = mongoose.model('User',userSchema);

module.exports = User;