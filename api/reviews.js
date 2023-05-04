const express = require("express");
const router = express.Router();
const Review = require("../models/Review")
const Park = require("../models/Park")


router.get("/park/:parkId",async(req , res)=>{
    let id = req.params.parkId;
    let reviews = await Review.find({parkId:id})
    res.send(reviews)
    

  
} )


router.get("/user/:userId",async(req , res)=>{
    let id = req.params.userId;
    let reviews = await Review.find({userId:id})
    res.send(reviews)
})



router.post("/:parkId", async (req, res)=>{
    let userId = req.user._id;
    let parkId = req.params.parkId;

    let park = await Park.find({_id:parkId});
    if(!park) return res.status(404).send("not found");

    const {rating , title , image, text} = req.body;
    
    if(!rating)return res.status(400).send("Bad request");

    let review = new Review({rating , title , image , text, userId, parkId});
    await review.save();
    res.send(review);
})


router.delete("/:reviewId", async(req, res)=>{

    let id = req.params.reviewId;
    let review = await Review.findOne({_id:id});
    console.log(review);
    if(!review.userId.equals(req.user._id))return res.status(403).send("forbidden");
    const delreview = await Review.deleteOne({_id:id});
   
    
    if(delreview?.deletedCount ){
        res.send({deleted:true})
    }else  res.send({deleted:false})
})






module.exports = router;