const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");

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

module.exports = {
    signup,
}