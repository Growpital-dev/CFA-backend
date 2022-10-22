const {
    newInvestments,
    getAllInvestments
} = require ('../../controllers/investmentControllers')

const router = require('express').Router();

router.get("/investment" , getAllInvestments )
router.get("/transaction" , getAllInvestments )
router.post("/investment" , newInvestments )


module.exports = router;