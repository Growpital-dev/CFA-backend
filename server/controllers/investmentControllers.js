
const Investment = require('../models/Investment')

const newInvestments = async (req, res) => {

    const {
        Plan_Type,
        Principal
     } = req.body;


     // creating new investement object
    let newInvestments = new Investment({
        User_Id: req.user.user_id,
        Plan_Type: Plan_Type,
        Principal: Principal
    })

    // saving the investments
    newInvestments.save()
        .then((data) => {
            res.status(200).json({success:true, data  })
        })

        .catch((err) => {
            res.status(400).json({ success:false,msg: err.message })

        })

}

const getAllInvestments = async (req, res) => {

    const id = req.user.user_id
    Investment.find(
        { User_Id: id },
        (err, data) => {
            if (err) {
                res.status(400).json({ success:false, message: "Some error occurred" })
            } else {
                res.status(200).json({ success:true,  data: data })
            }
        }
    )

}






module.exports = {
    newInvestments,
    getAllInvestments,
    
}