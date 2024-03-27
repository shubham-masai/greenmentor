const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userRouter = require("./routes/user.routes");
const taskRouter = require("./routes/task.routes");
const profileRouter = require("./routes/profile.routes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/task", taskRouter);
app.use("/profile",profileRouter)
app.listen(8080, async () => {
    try {
        await connection
        console.log("server is running at port 8080");
    } catch (error) {
        console.log(error);
    }
})