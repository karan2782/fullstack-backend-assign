const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:[true, "Please provide name of the product"]
    },
    description:{
        type:String, 
        required:[true, "Please provide description of the product"]
    },
    image:{
        type:String,
        required:true
    },
   
    userId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"User"
    }
})

const Product = mongoose.model("Product", productSchema)

module.exports = {Product}

