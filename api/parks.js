const express = require("express");
const router = express.Router();
const Park = require("../models/Park");

router.get("/", async (req, res)=>{
    try{
        const parks = await Park.find({});
        res.send(parks)
    }catch(err){

    }
})

router.post('/', async (req, res)=>{
    try{
       if(!req.user.isAdmin)return res.status(401).send("You are not authorized to do that");
       const {lat , long , name ,image , address } = req.body;

       if(!lat || !long ||!name ||!address)return res.status(400).send("Please fill all the fields");


       let park = new park({lat, long, name, image, address});

       res.send (park)
    }catch(err){

    }
})






module.exports = router;