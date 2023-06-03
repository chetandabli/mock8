const { UserModel } = require("../model/userModel");
const express = require("express");
const userRouter = express.Router();
var bcrypt = require('bcryptjs');
require('dotenv').config();
var jwt = require('jsonwebtoken');
const { PostModel } = require("../model/postModel")

userRouter.post("/signup", async(req, res)=>{
    try {
        let isExist = await UserModel.findOne({"email": req.body.email})
        if(!isExist){
            let hash = bcrypt.hashSync(req.body.password, process.env.salt);

            let user = new UserModel({"email": req.body.email, "password": hash});
            await user.save();

            res.status(201).json({"msg": "user is registered!"})
        }else{
            res.status(400).send("user is already registered!")
        }
    } catch (error) {
       console.log(error) 
    }
})

userRouter.post("/login", async(req, res)=>{
    try {
        let isExist = await UserModel.findOne({"email": req.body.email})
        if(!isExist){
            res.status(400).json({"msg": "user is not registered!"})
        }else{
            let verifyUser = bcrypt.compareSync(req.body.password, isExist.password)
            if(verifyUser){
                var token = jwt.sign({ email: isExist.email }, process.env.jwtSecret);

                res.status(200).json({"msg": "user is logged in!", "token": token})
            }else{
                res.status(400).json({"msg": "Password is wrong"})
            }
            
        }
    } catch (error) {
       console.log(error) 
    }
})

userRouter.post("/post", async(req, res)=>{
    try {
        const newPost = new PostModel(req.body);
        await newPost.save();
        res.status(201).json({"msg": "posted!"})
    } catch (error) {
        console.log(error)
    }
})
userRouter.get("/post", async(req, res)=>{
    try {
        const post = await PostModel.find({})
        res.status(201).json({"length": post.length})
    } catch (error) {
        console.log(error)
    }
})
userRouter.get("/post/:page", async(req, res)=>{
    let page = req.params.page;
    let skip =(page-1)*4
    try {
        const post = await PostModel.find({}).skip(skip).limit(4)
        res.status(201).json(post)
    } catch (error) {
        console.log(error)
    }
})
userRouter.get("/filterpost", async(req, res)=>{
    let category = req.query.category;
    try {
        const post = await PostModel.find({"category": category})
        res.status(201).json(post)
    } catch (error) {
        console.log(error)
    }
})
userRouter.get("/sort", async(req, res)=>{
    let sort = req.query.sort;
    if(sort == "sortbylatest"){
        try {
            const post = await PostModel.find({}).sort({"postedAt":-1})
            res.status(201).json(post)
        } catch (error) {
            console.log(error)
        }
    }else{
        try {
            let post = await PostModel.find({}).sort({"postedAt":1});

            post = post.reverse()
            res.status(201).json(post)
        } catch (error) {
            console.log(error)
        }  
    }
    
})

module.exports = {
    userRouter
}

