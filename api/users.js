const express = require("express")
const router = express.Router()

const User = require("../models/User");



router.get("/:id", async (req, res)=>{
    try {
    let id = req.params.id;
    let user = await User.findOne({_id:id});
    res.send(user)
}catch(err){
    return res.status(500).send("internal server error")
}

});

router.put("/:id", async (req, res)=>{
    try {
    let id = req.params.id;

    if (req.user._id != id) {
        return res.status(401).send('unauthorized');
    }

    let body = req.body;
    let updatedUser = await User.findOneAndUpdate( {_id:id}, req.body, {new:true} )
   console.log(req.body)
   res.send(updatedUser); 
}catch(err){
    return res.status(500).send("internal server error")
}
})


module.exports = router; 