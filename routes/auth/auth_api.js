const {
    login,
    signup,
    verifyotp,
    getprofile,
    sendotp,
    updateprofile,
    isEmailValid

} = require ('../../controllers/userControllers')

const jwt_auth = require("../../middleware/jwt_auth");


const router = require('express').Router();

// login 
router.post("/login"  ,login )

// check if email is already registerd
router.post("/email"  ,isEmailValid )

//signup
router.post("/signup" , signup )

// send otp to user
router.get("/otp" ,jwt_auth ,sendotp  )

// verify otp
router.post("/otp" ,jwt_auth ,verifyotp  )

// fetch profile data
router.get("/profile" , jwt_auth ,getprofile )

// update profile data
router.patch("/profile" , jwt_auth , updateprofile )



// // sendign otp to user 
// router.post("/verification" , jwt_auth , sendotp )






module.exports = router;