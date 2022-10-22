const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
  {

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

    Verified: {
      type: Boolean
    },
  
  }

);

module.exports = mongoose.model("User", UserSchema);