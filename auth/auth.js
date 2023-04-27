const express = require("express");
const bcrypt = require("bcrypt");
const router = new express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/register", async (req, res) => {
    console.log(await User.find({}))
        const { username, email ,  password } = req.body;
        if (!username  ||!email || !password) res.status(400).send("Username, Email and Password are required")
        const hash = await bcrypt.hash(password, 10);
        let foundUser = await User.findOne({ username });
        if (foundUser) return res.status(409).send("Username already taken");
        foundUser = await User.findOne({ email });
        if (foundUser) return res.status(409).send("Email already taken");
        const user = new User({ username, email, password: hash });
        await user.save();
        let token = jwt.sign({ username, email }, process.env.JWT_SECRET);
        res.cookie("auth", token);
        return res.status(201).send({ username, email });
})


router.post("/login", async (req, res) => {

        const { username, password } = req.body;
        if (!username || !password) res.status(400).send("Username and Password required")
        console.log(username, password)
        let user = null;

        if(username.split("@")[1] )user= await User.findOne({ email:username});
        else user = await User.findOne({ username });

        bcrypt.compare(password, user.password, async function (err, result) {

            if (!result) return res.status(401).send("incorrect password")
            let token = jwt.sign({ username: user.username, email:user.email }, process.env.JWT_SECRET);
            res.cookie("auth", token);
            return res.status(201).send({ username: user.username, email:user.email });
        });
})


router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.send('success');
})

router.get('/me', async (req, res) => {
    try{
        let auth = req.cookies.auth;
        let verified = jwt.verify(auth, process.env.JWT_SECRET);
        if (!verified) {
            res.clearCookie();
            return res.status(401).send("invalid token");
        }
        let user = await User.findOne({ username: verified.username });
        return res.status(200).send({ username: user.username, email: user.email});
    } catch (err) {
        return res.status(500).send('some error occured');
    }
})



module.exports = router;