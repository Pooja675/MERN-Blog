const express = require("express")
const connectDB = require("../config/database")

const app = express()


connectDB()
    .then(() => {
        console.log("Database connection established..")
        app.listen(() => {
            console.log("Server is running on port 5555!!")
        })
    })
    .catch(() => {
        console.log("Database cannot be connected....")
    })

