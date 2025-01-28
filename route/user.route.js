const express = require('express')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

require('dotenv').config()

const { User } = require('../model/user.model')
const { auth } = require('../middleware/auth.middleware')

const userRouter = express.Router()

userRouter.post("/signup", async(req, res)=>{
    const {name, email, password, role, gender} = req.body 
    try {
        bcrypt.hash(password, 3, async (err, hashed)=>{
            if(err){
                return res.status(500).json({message:`Error in hashing the password ${err}`})
            }
            const user = new User({name, email, password:hashed, role, gender})
            await user.save()
            return res.status(201).json({message:`User registered successfully, Welcome ${user.name}`})
        })
    } catch (error) {
        res.status(500).json({message:`Something went wrong ${error}`})
    }
})


userRouter.post("/login", async(req, res)=>{
    const {email, password} = req.body 
    try {
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(500).json({message:"User not found"})
        }
        bcrypt.compare(password, user.password, (err, result)=>{
            if(err){
                return res.status(500).json({message:`Password is not matching`})
            }
            const token = jwt.sign({userId:user._id}, process.env.SECRET_KEY, {expiresIn:"1h"})
            res.status(200).json({message:"User login successfully", token})

        })
    } catch (error) {
        res.status(500).json({message:`Something went wrong error: ${error}`})
    }
})

userRouter.get("/users", async(req, res)=>{
    
    try {
        
        const users = await User.find()
        res.status(200).json({users})
    } catch (error) {
        res.status(500).json({message:`User not fetching successfully`})
    }
})

userRouter.delete("/user/:id", async(req, res)=>{
    const {id} = req.params
    console.log(id);
    
    try {
        const user = await User.findByIdAndDelete({_id:id})
        res.status(200).json({message:"User deleted successfully"})
    } catch (error) {
        res.status(500).json({message:`Error in deleting the user ${error}`})
    }
})


module.exports = {userRouter}


