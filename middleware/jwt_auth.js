require('dotenv').config();
const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
  const token = req.headers.token;

  // if token is not present in the request header
  if (!token) {
    return res.status(403).json({success:false,message:"A token is required for authentication"});
  }


  try {
    // checking if token is valid
    const decoded = jwt.verify(token,  process.env.TOKEN_KEY)

    // storing the user's details in req.user
    req.user = decoded;

  } catch (err) {
    console.log(err);
    return res.status(401).json({success:false, message:"some error occured"});
  }

  return next();
  
};

module.exports = verifyToken;
