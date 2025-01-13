const User = require("../models/user.model");
const bcryptjs = require("bcryptjs")

const signup = async (req, res) => {
    const {userName, emailId, password} = req.body;

    if(!userName || !emailId || !password || userName === '' || emailId === '' || password === ''){
        return res.status(400).json({message: "All fields are required"})
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
        res.status(500).json({message:error.message})
    }
}

module.exports = {
    signup,
}