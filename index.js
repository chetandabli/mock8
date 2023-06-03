const express = require("express");
const app = express();
const path = require("path")
require('dotenv').config()
const {connection} = require("./configs/db")
const { userRouter } = require("./routes/user")

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')))

app.use("/", userRouter)

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"index.html")
})



app.listen(process.env.port, async()=>{
    try {
        await connection;
        console.log("connnection establised with database.")
    } catch (error) {
        console.log(error)
    }
    console.log("app is running...")
})