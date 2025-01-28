const mongoose = require('mongoose')


const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database is connected successfully");
        
    } catch (error) {
        console.log(`Error in connecting to database`)
    }
}

module.exports = {connection}