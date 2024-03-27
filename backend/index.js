const express = require("express");
const cors = require("cors");
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());
const connection = require("./db");
const userRouter = require("./routes/user.routes");
const taskRouter = require("./routes/task.routes");
const profileRouter = require("./routes/profile.routes");



app.use("/user", userRouter);
app.use("/task", taskRouter);
app.use("/profile", profileRouter);
app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("db is connected.");
    } catch (error) {
        console.log(error);
    }
})