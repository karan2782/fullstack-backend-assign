const express = require("express")
const { connection } = require("./config/connection")
const { userRouter } = require("./route/user.route")
const { productRouter } = require("./route/product.route")
const cors = require("cors")
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", userRouter)
app.use("/api/product", productRouter)



app.get("/", (req, res)=>{
    res.send("Hello HomePage")
})

app.listen(process.env.PORT, ()=>{
    connection()
    console.log(`Server is running on port: ${process.env.PORT}`);
    
})


