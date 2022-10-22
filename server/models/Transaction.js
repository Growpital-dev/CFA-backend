const mongoose = require('mongoose')

const TransactionSchema = mongoose.Schema(
   {

    Investment_Id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    Type:{
      type:String,
    },

    Inevestment_Id:{
      type:String,
    },

    Sender:{
      type:String,
    },

    Receiver:{
      type:String,
    },

    Amount:{
      type:Number,
    },

    Status:{
      type:String,
    }

   },
   { timestamps: true }

  );
  
  module.exports = mongoose.model("Transaction", TransactionSchema);