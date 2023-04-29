const express = require("express");
const router = express.Router();
const Post = require("../models/Post")
const Park = require("../models/Park")



router.get("/park/:parkId",async(req , res)=>{
    let id = req.params.parkId;
    let posts = await Post.find({parkId:id})
    res.send(posts)
    

  
} )


router.get("/user/:userId",async(req , res)=>{
    let id = req.params.userId;
    let posts = await Post.find({userId:id})
    res.send(posts)
})


router.post("/:parkId", async(req , res)=>{
    let parkId = req.params.parkId;
    let userId = req.user._id;

    let park = await Park.findOne({_id:parkId});
    if(!park)return res.status(404).send("not found");

    const {title , text , image  } = req.body;
    if(!title || !text) return res.status(400).send("bad request");
    
    let post = new Post({parkId, userId , title, image, text});
    await post.save();

    res.send(post)
})

router.put("/:postId", async (req, res)=>{
    let id = req.params.postId;
    
    let post = await Post.findOne({_id:id});
   
    if(!post.userId.equals(req.user._id))return res.status(403).send("forbidden");
    let {title , text , image}  = req.body;
    if(!(title || text || image))return res.status(400).send("bad request");
    let update ={};
    if (title)  update.title = title;
    if (text)  update.text = text;
    if (image)  update.image = image;
    update.edited = true;
    

    
     let editedPost = await Post.findOneAndUpdate({_id:id}, update, {new: true} );

     res.send(editedPost)
})


router.delete("/:postId", async(req, res)=>{
    let id = req.params.postId;
    console.log(id)
    let post = await Post.findOne({_id:id});
    console.log(post)
   
    if(!post.userId.equals(req.user._id))return res.status(403).send("forbidden");
    const deleted = await Post.deleteOne({_id:id});
    if(deleted?.deletedCount ){
        res.send({deleted:true})
    }else  res.send({deleted:false})
})





module.exports = router;