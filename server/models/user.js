const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
   {

    Email:{
      type:String,
      require:true
    },

    Password:{
      type:String,
      require:true
    },

    Phone:{
      type:Number,
      require:true
    },

    Balance:{
      type:Number,
    },

    Aadhaar_Number:{
      type:Number
    },

    Verified:{
      type:Boolean
    }

    

    

   }

  );
  
  module.exports = mongoose.model("User", UserSchema);