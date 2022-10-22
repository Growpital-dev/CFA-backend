
const Investment = require('../models/Investment')

const newInvestments = async (req, res) => {

    const {User,Plan_Type,Principal} = req.body;
    let newInvestments = new Investment({
        User_Id:User,
        Plan_Type:Plan_Type,
        Principal:Principal
    })

    newInvestments.save()
        .then((saved)=>{
            res.status(200).json({saved})
        })

        .catch((err)=>{
            res.status(400).json({msg:err.message})

        })

}

const getAllInvestments = async (req, res) => {

    const {User_Id} = req.body;

    Investment.find(
        {User_Id:"63526f5a6e5f0541c7d09da5"},
        (err,data)=>{
            if(err){
                res.status(400).json({message:"Some error occurred"})
            }else{
                res.status(200).json({data:data})
            }
        }
    )
   
}



module.exports = {
   newInvestments,
   getAllInvestments
}