const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.mongo_url,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB