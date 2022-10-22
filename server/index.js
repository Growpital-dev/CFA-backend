const express = require('express');
const { mongoose } = require('mongoose');
const connectDB = require('./db/db')
const app = express();
const port = 3500;



// connect to mongoose
connectDB();

app.use(express.json())

// router
app.use('/auth',require('./routes/auth/auth_api'))
app.use('/account',require('./routes/Investments/investment_api.js'))


// checking if mongodb connection is successful or not
mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB');
    app.listen(port,()=>{
        console.log(`server started at port 3000`);
    })
})

