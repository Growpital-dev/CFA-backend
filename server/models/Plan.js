const mongoose = require('mongoose')

const PlanSchema = mongoose.Schema(
   {


    Plan_Type:{
      type:String,
      require:true
    },

    Principal:{
        type:Number,
        require:true
    },

    ROI:{
        type:String
    },

    Description:{
        type:String
    }

   }

  );
  
  module.exports = mongoose.model("Plan", PlanSchema);