const mongoose = require("mongoose")

const postSchema = mongoose.Schema({

    userId:{
        type:String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true,
        unique: true,
    },
    imageUrl:{
        type: String,
        default: "https://cdn.webgift.eu/images/userfiles/webdesign2022_1x1.jpg",
    },
    category:{
        type: String,
        dafault: "uncategorized",
    },
    slug:{
        type: String,
        required: true,
        unique: true,
    }
}, {timestamps: true})

module.exports = mongoose.model('Post', postSchema)