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
       if(!req.user.isAdmin)return res.status(401).send("You are not authorized to do that");
       const {lat , long , name ,image } = req.body;

       if(!lat || !long ||!name )return res.status(400).send("Please fill all the fields");


       let park = new park({lat, long, name, image});

       res.send (park)
    }catch(err){
        return res.status(500).send("internal server error")
    }
})



router.delete("/:id", async (req, res)=>{
    try{
        if(!req.user.isAdmin)return res.status(401).send("You are not authorized to do that");
        const id = req.params.id;
        const park = await Park.findByIdAndDelete(id);
        if(park.deletedCount ){
            res.send({deleted:true})
        }else  res.send({deleted:false})

    }catch(err){
        return res.status(500).send("internal server error")
    }
})






module.exports = router;