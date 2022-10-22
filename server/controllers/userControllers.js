const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10;

require('dotenv').config();

const signup = async (req, res) => {

    const {
        Email,
        Password,
        Phone,
        Balance,
        Aadhaar_Number,
        Verified
    } = req.body;



    User.findOne({ Email: Email })
        // if Email already exists in the database
        .then((savedUser) => {

            if (savedUser) {
                return res.status(422).json(
                    {
                        success: false,
                        error: "Email already exists"
                    })

                // if Email is not present in the database
            } else {

                // creating a new user
                const newUser = new User({
                    Email,
                    Password,
                    Phone,
                    Balance,
                    Aadhaar_Number,
                    Verified
                })

                // hashing the password
                const hash = bcrypt.hashSync(Password, saltRounds);

                newUser.Password = hash;

                // storing the user in the database
                newUser.save()
                    .then((user) => {
                        res.status(200).json({ success: true, message: "Account created successfully" })
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(400).json({ success: false, message: err.message })
                    })
            }
        })
        .catch((err) => {
            console.error(err);

            res.status(400).json({ success: false, message: "some error occurred" })
        })
}


const login = async (req, res) => {

    const {
        Email,
        Password,
    } = req.body;

    // searching for email in the database
    User.findOne({ Email: Email })
        .then((user) => {

            // if email is not present in the database
            if (!user) {
                return res.status(422).json({
                    success: false,
                    error: "Email is is not registered"
                })


            } else {
                // if email is present 
                // comparing passwords
                if (bcrypt.compareSync(Password, user.Password)) {

                    // generating token, duration of token is 90d
                    let token = jwt.sign(
                        { user_id: user._id },
                        process.env.TOKEN_KEY,
                        {
                            expiresIn: "90d",
                        }
                    )

                    return res.status(200).json({ success: true, token: token })
                } else {
                    return res.status(400).json({ success: false, message: "Invalid credentials" })
                }
            }
        })

        .catch((err) => {
            console.log(err);
            return res.status(400).json({ success: false, message: "Some error occured" })
        })
}





const home = (req, res) => {

    res.status(200).json({success:true, message:"you are authenticated"})
}

module.exports = {
    login,
    signup,
    home
}