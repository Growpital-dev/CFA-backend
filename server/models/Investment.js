const mongoose = require('mongoose')

const InvestementSchema = mongoose.Schema(
   {

    User_Id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        select:false
    },

    Plan_Type:{
      type:String,
      required:true
    },

    Principal:{
        type:Number,
        required:true
    }

   },
   { timestamps: true }

  );
  
  module.exports = mongoose.model("Investment", InvestementSchema);