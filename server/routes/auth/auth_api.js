const {
    login,
    signup,
    home
} = require ('../../controllers/userControllers')

const jwt_auth = require("../../middleware/jwt_auth");


const router = require('express').Router();

// login 
router.post("/login"  ,login )
//signup
router.post("/signup" , signup )

router.get("/" , jwt_auth , home )


module.exports = router;