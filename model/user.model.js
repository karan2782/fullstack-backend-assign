const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:true
    }, 
    email:{
        type:String, 
        required:[true, "Email is required"]
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    }, 
     gender:{
            type:String, 
            enum:["male", "female", "other"],
            required:true
        },
    role:{
        type:String, 
        enum:["user", "admin"],
        default:"user", 
        required:true
    }
})

const User = mongoose.model("User", userSchema)

module.exports = {User}