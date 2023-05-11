const express = require("express");
const router = express.Router();
const Park = require("../models/Park");

router.get("/", async (req, res)=>{
    try{
        const parks = await Park.find({});
        res.send(parks)
    }catch(err){
        return res.status(500).send("internal server error")
    }
})

router.post('/', async (req, res)=>{
    try{
        console.log('request');
       if(!req.user.isAdmin)return res.status(401).send("You are not authorized to do that");
       const {lat , long , name ,image } = req.body;

       if(!lat || !long ||!name )return res.status(400).send("Please fill all the fields");


       let park = new Park({lat, long, name, image});
       await park.save();

       res.send (park)
     }catch(err){
        return res.status(500).send("internal server error")
    }
})



router.delete("/:id", async (req, res)=>{

        if(!req.user.isAdmin)return res.status(401).send("You are not authorized to do that");
        const id = req.params.id;
        const park = await Park.deleteOne({_id:id});
        console.log(park)
        if(park?.deletedCount ){
            res.send({deleted:true})
        }else  res.send({deleted:false})

})






module.exports = router;