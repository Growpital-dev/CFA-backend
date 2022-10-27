const mongoose = require('mongoose')

const TransactionSchema = mongoose.Schema(
   {

    User_Id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      select:false
  },

    Type:{
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


  // TransactionSchema.methods.toJSON = function() {
  //   var obj = this.toObject();
  //   delete obj.User_Id;
  //   return obj;
  //  }
  
  module.exports = mongoose.model("Transaction", TransactionSchema);