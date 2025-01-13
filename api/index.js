const express = require("express")
const connectDB = require("../config/database")
const userRouter = require("./routes/user.route")


const app = express()

app.use("/", userRouter);

connectDB()
    .then(() => {
        console.log("Database connection established..")
        app.listen("5555", () => {
            console.log("Server is running on port 5555!!")
        })
    })
    .catch(() => {
        console.log("Database cannot be connected....")
    })

    
