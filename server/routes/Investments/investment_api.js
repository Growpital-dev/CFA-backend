const {
    newInvestments,
    getAllInvestments,
} = require ('../../controllers/investmentControllers')

const jwt_auth = require('../../middleware/jwt_auth')
const router = require('express').Router();

// fetches all investments
router.get("/investment" ,  jwt_auth, getAllInvestments )

// adds a new investment
router.post("/investment", jwt_auth ,newInvestments )




module.exports = router;