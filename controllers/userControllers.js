require('dotenv').config();
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config();

const { transporter, generateotp } = require('../utils/sendotp')

const saltRounds = 10;

const isEmailValid = async (req,res)=>{

    const {Email} = req.body;

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

                return res.status(200).json(
                    {
                        success: true,
                        error: "Success"
                    })
            }
        })
        .catch((err) => {
            console.error(err);

            res.status(400).json({ success: false, message: "some error occurred" })
        })
}

// signup route
const signup = async (req, res) => {

    const {
        Name,
        Email,
        Password,
        Phone,
        Balance,
        Aadhaar_Number,
        IFSC_Code,
        Account_No
    } = req.body;


    const Verified = false;



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
                    Name,Email, Password, Phone, Balance, Aadhaar_Number, Account_No,IFSC_Code,Verified
                })

                // hashing the password
                const hash = bcrypt.hashSync(Password, saltRounds);

                newUser.Password = hash;



                // storing the user in the database
                newUser.save()
                    .then(() => {

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


// login route
const login = async (req, res) => {

    const {
        Email,
        Password,
    } = req.body;

    console.log(Email,Password);

    // searching for email in the database
    User.findOne({ Email: Email })
        .then((user) => {

            // if email is not present in the database
            if (!user) {
                return res.status(422).json({
                    success: false,
                    error: "Email is is not registered"
                })


                // if email is present 
            } else {

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

                    // if the account is not verified
                    if (user.Verified == 'false') {
                        console.log("no");
                        return res.status(200).json({ success: false, token: token, verify: user.Verified })
                    } else {
                        return res.status(200).json({ success: true, token: token, verify: user.Verified })
                    }

                } else {
                    console.log("no");

                    return res.status(400).json({ success: false, message: "Invalid credentials" })
                }
            }
        })

        .catch((err) => {
            console.log(err);
            return res.status(400).json({ success: false, message: "Some error occurred" })
        })
}

// get profile details
const getprofile = async (req, res) => {

    // object id of user
    const id = req.user.user_id

    User.findById(id).select("-Password")
        .then((data) => {
            let filterData = data.toJSON()

            delete filterData._id
            delete filterData.Otp

            res.status(200).json({ success: true, data: filterData })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false, message: "some error occurred" })
        })
}


// update profile details
const updateprofile = (req, res) => {

    // object id of user
    const id = req.user.user_id
    console.log(req.body);

    // updating data
    User.findByIdAndUpdate(
        // searching by id
        { _id: id },
        // items to be updated
        req.body,

        (err, data) => {
            if (err) {
                res.status(400).json({ success: false, message: "couldn't update data" })
            } else {

                User.findById(id)
                    .then((data) => {
                        console.log(data);
                        res.status(200).json({ success: true, message: data })

                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(400).json({ success: false, message: "some error occured" })

                    })
            }
        }
    )
}


// send otp 
const sendotp = (req, res) => {
    // object id of user
    const id = req.user.user_id

    User.findById(id)
        .then((saveduser) => {

            // otp generator 
            const six_digit = generateotp()
            saveduser.Otp = six_digit
            //  console.log(six_digit);

            saveduser.save()
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    res.status(400).json({ success: false, message: "some error occurred" })

                })

            const mailOptions = {
                from: process.env.Email,
                to: saveduser.Email,
                subject: 'verify email',
                text: `${six_digit}`
            };


            //  sending email to the user
            transporter.sendMail(mailOptions, function (error, info) {

                if (error) {
                    success = false;
                    console.log(error);
                    res.status(400).json({ success: false, message: "some error occurred" })

                } else {
                    success = true;
                    res.status(200).json({ success: true, message: "An Otp has been sent to your email" })
                }
            });


        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false, message: "some error occurred" })
        })
}

// verify otp 
const verifyotp = (req, res) => {

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
    isEmailValid,
    login,
    signup,
    getprofile,
    updateprofile,
    sendotp,
    verifyotp,
    
}