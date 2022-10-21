const express = require('express');
const { mongoose } = require('mongoose');
const connectDB = require('./db/db')
const app = express();
const port = 3500;


// connect to mongoose
connectDB();

// router
app.use('/',require('./routes/api'))

// checking if mongodb connection is successful or not
mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB');
    app.listen(port,()=>{
        console.log(`server started at port 3000`);
    })
})

