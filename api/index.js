const express = require("express")
const connectDB = require("../config/database")
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const app = express()

app.use(express.json())

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

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


   app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
   }) 
    
