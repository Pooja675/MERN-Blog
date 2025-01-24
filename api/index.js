const express = require("express");
const monggose = require("mongoose");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const postRouter = require("./routes/post.route");
const commentRouter = require("./routes/comment.route");
const dotenv = require("dotenv")

const path = require("path");
const app = express();
dotenv.config()

monggose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Database connection established..");
  })
  .catch(() => {
    console.log("Database cannot be connected....");
  });


app.use(express.json());
app.use(cookieParser());

app.listen("5555", () => {
    console.log("Server is running on port 5555!!");
  });

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
