const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique:true

    },
    emailId:{
        type: String,
        required: true,
        unique:true

    },
    password:{
        type: String,
        required: true,
    },
    profilePcture:{
        type: String,
        default:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    }
}, {timestamps:true})

module.exports = mongoose.model("User", userSchema)