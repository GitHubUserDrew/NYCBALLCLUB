const jwt = require("jsonwebtoken")
const User = require("../models/User")
require('dotenv').config();

module.exports =async  (req, res, next) => {
    let auth = req.cookies.auth;
    console.log('auth');
    if (!auth) {
        return res.status(401).json({ message: 'No token provided' });
    }
    let verified = jwt.verify(auth, process.env.JWT_SECRET);
    if (!verified) {
        res.clearCookie();
        return res.status(401).send("invalid token");
    }
        req.user = await User.findOne({username : verified.username});
    return next();
}