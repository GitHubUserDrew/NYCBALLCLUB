const express = require("express");
const mongoose = require("mongoose")
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser")
mongoose.set("debug", true);
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser())


 mongoose.connect(process.env.MONGODB_URI)


const authRouter = require("./auth/auth")
app.use("/auth", authRouter)
app.use(express.static(__dirname+ '/client/build'));
app.use(require('./middlewares/authenticate'));
app.use("/parks", require('./api/parks'))
app.use("/posts/", require('./api/posts'));
app.use("/reviews/", require("./api/reviews"))
app.use("/users/", require("./api/users"))




const PORT = process.env.PORT || 5000
app.listen(PORT, () => { console.log('server started ') })