const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const cookieParser=require("cookie-parser")
const taskRoute=require("./Routes/task.route")
const categoryRoute= require("./Routes/category.route")
const helmet = require('helmet');
const port = process.env.PORT || 3000
require("dotenv").config();
require("./config/db")
app.use(cookieParser());
const UserRoute=require("./Routes/user.route")
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "trusted-cdn.com"],
            imgSrc: ["'self'", "trusted-images.com"],
        },
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
}));


app.get("/",(req,res)=>{
    res.send("<center><h1>Task Management App All apis</h1><br>Get All Apis Use My Link <a href=https://github.com/Kotak111 target=_blank>Repository :- DailyTask_clone</a></center>")
})
app.use("/api/v1/user",UserRoute)
app.use("/api/v2/task",taskRoute)
app.use("/api/v2/category",categoryRoute)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


