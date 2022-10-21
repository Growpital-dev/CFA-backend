const {
    login
} = require ('../controllers/userControllers')

const router = require('express').Router();

router.get("/login" , login )


module.exports = router;