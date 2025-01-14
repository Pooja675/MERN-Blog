const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken")

const signup = async (req, res, next) => {
    const {userName, emailId, password} = req.body;

    if(!userName || !emailId || !password || userName === '' || emailId === '' || password === ''){
        next(errorHandler(400, "All fields are required"));
    }

    const hashPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
        userName,
        emailId,
        password: hashPassword,
    })

    try {
        await newUser.save()
        res.json("Signup successfully...")
    } catch (error) {
        next(error)
    }
}

const signin = async (req, res, next) => {
    const {emailId, password } = req.body;

    if(!emailId || !password || emailId === '' || password === ''){
        next(errorHandler(400, "All fields are required"));
    }

    try {

        const validUser = await User.findOne({emailId})
        if(!validUser){
            return next(errorHandler(400, 'User not found'))
        }
        
        const validPassword =  bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(400,'Invalid Password'))
        }

        const {password:pass, ...rest} = validUser._doc //need to hide password 

        const token = jwt.sign({_id: validUser._id},process.env.JWT_SECRET);

        res.status(200).cookie("access_token", token, {httpOnly: true}).json(rest)

    } catch (error) {
        next(error)
    }
 }

module.exports = {
    signup,
    signin,
}