const monggose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const connectDB = async () => {

    await monggose.connect(process.env.MONGO)
}

module.exports = connectDB