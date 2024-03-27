const express = require("express");
const TaskModel = require("../model/task.model");
const auth = require("../middleware/auth.middleware");
const taskRouter = express.Router();

taskRouter.use(auth);

// Route for creating a new task

taskRouter.post("/create", async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.userId;
        if (!title || !description || !userId) {
            return res.status(400).json({ error: 'Title and description are required fields.' });
        }

        const newTask = new TaskModel({ title, description, user: userId });
        await newTask.save();
        res.status(201).json({ msg: 'Task created successfully', newTask });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Route for getting all tasks
taskRouter.get("/", async (req, res) => {
    try {
        const userId = req.userId;
        const tasks = await TaskModel.find({ user: userId });
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error" });
    }
});


// Route for updating a task by ID
taskRouter.put("/:id", async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.userId;
        if (!title || !description || !userId) {
            return res.status(400).json({ error: 'Title and description are required fields.' });
        }
        const updatedTask = await TaskModel.findOneAndUpdate(
            { _id: req.params.id, user: userId },
            { title, description },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).send({ msg: "Task not found or unauthorized" });
        }

        res.status(200).send(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
});

// Route for deleting a task by ID
taskRouter.delete("/:id", async (req, res) => {
    try {
        const userId = req.userId;
        const deletedTask = await TaskModel.findOneAndDelete({ _id: req.params.id, user: userId });
        if (!deletedTask) {
            return res.status(404).send({ msg: "Task not found or unauthorized" });
        }
        res.status(200).send({ msg: "Task deleted successfully" });
    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error" });
    }
});

module.exports = taskRouter;
