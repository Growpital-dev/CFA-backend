const Investment = require('../models/Investment')
const Transaction = require("../models/Transaction")
const User = require('../models/User')

const newInvestments = async (req, res) => {



    const {
        Plan_Type,
        Principal,
        Roi
    } = req.body;

    // creating new investement object
    let newInvestments = new Investment({
        User_Id: req.user.user_id,
        Plan_Type: Plan_Type,
        Principal: Principal,
        Roi: Roi
    })

    // acount no of the user
    const Account_No = await User.findById(req.user.user_id)
        .then((saveduser) => {
            return saveduser.Account_No;
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false, message: "some error occurred" })
        })

    console.log(Account_No);


    let newTransaction = new Transaction({
        User_Id: req.user.user_id,
        Amount: Principal,
        Sender: Account_No,
        Receiver: "Growpital",
        Status: "Success"
    })

    newTransaction.save()
        .then((data) => {
            console.log(data);
            // res.status(200).json({success:true, data:data  })
        })
        .catch((err) => {
            res.status(400).json({ success: false, message: "failed" })

        })

    // saving the investments
    newInvestments.save()
        .then((data) => {
            res.status(200).json({success:true, data  })
        })

        .catch((err) => {
            res.status(400).json({ success:false,message: "some error occcured" })

        })

}

// get all investments
const getAllInvestments = (req, res) => {

    const id = req.user.user_id
    Investment.find(
        { User_Id: id },
        (err, data) => {
            if (err) {
                res.status(400).json({ success: false, message: "Some error occurred" })
            } else {
                res.status(200).json({ success: true, data: data })
            }
        }
    )

}

const transaction = (req, res) => {

    const id = req.user.user_id
    Transaction.find(
        { User_Id: id },
        (err, data) => {
            if (err) {
                res.status(400).json({ success: false, message: "Some error occurred" })
            } else {
                console.log(id);
                res.status(200).json({ success: true, data: data })
            }
        }
    )

}

const newtransaction = () => {
    const id = req.user.user_id
    const Otp = req.body.Otp


    console.log(Otp);

    User.findById(id)
        .then((saveduser) => {


            if (saveduser.Otp != Otp) {
                res.status(400).json({ success: false, message: "wrong otp" })

            } else {

                saveduser.Verified = 'true';

                saveduser.save()
                    .then(() => {
                        res.status(200).json({ success: true, message: "Account verification successfull" })

                    })
                    .catch((err) => {
                        res.status(400).json({ success: false, message: "some error occurred" })

                    })
            }

        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false, message: "some error occurred" })
        })
}

module.exports = {
    newInvestments,
    getAllInvestments,
    transaction,
    newtransaction

}