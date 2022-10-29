const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
  {

    Name:{
      type: String,
      required: true
    },

    Email: {
      type: String,
      required: true
    },

    Password: {
      type: String,
      required: true
    },

    Phone: {
      type: Number,
      required: true
    },

    Balance: {
      type: Number,
    },

    Aadhaar_Number: {
      type: Number,
      required: true
    },

    IFSC_Code: {
      type: String,
      required: true
    },

    Account_No:{
      type:String,
      require:true,
    },

    Verified: {
      type: Boolean
    },

    Otp : {
      type:Number,
      // select:false

    }
  
  }

);

module.exports = mongoose.model("User", UserSchema);