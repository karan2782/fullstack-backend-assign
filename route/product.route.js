const express = require("express");
const { upload } = require("../config/upload");
const cloudinary = require("../config/cloudinary");
const { auth } = require("../middleware/auth.middleware");
const fs = require("fs");
const { Product } = require("../model/product.model");

const productRouter = express.Router();

productRouter.post("/", auth, upload.single("image"), async (req, res) => {
  const { name, description } = req.body;
  const userId = req.userInfo._id;

  try {
    const x = await cloudinary.uploader.upload(req.file.path);
    const image = x.secure_url;
    const product = new Product({ name, description, userId, image });
    await product.save();

    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log(`Error in deleted file from upload ${err}`);
        return;
      }
      
      
    });
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({message:`Error in creating the product ${error}`})
  }
});


productRouter.get("/",  async(req, res)=>{
  try {
    const products = await Product.find()
    res.status(200).json({products})
  } catch (error) {
    res.status(500).json({message:`Products not found`})
  }
})

productRouter.delete("/:id", auth, async(req, res)=>{
  const {id} = req.params
  try {
    const product = await Product.findByIdAndDelete({_id:id})

    res.status(200).json({message:`Product deleted successfully!`})
  } catch (error) {
    res.status(500).json({message:`Error in deleting the product ${error}`})
  }
})


productRouter.patch("/:id", auth, async(req, res)=>{
  const {id} = req.params 
  const payload = req.body
  try {
    const product = await Product.findByIdAndUpdate({_id:id}, payload)
    res.status(201).json({message:"Product updated successfully!"})
  } catch (error) {
    res.status(500).json({message:`Error in updating the product ${error}`})
  }
})

module.exports = { productRouter };
