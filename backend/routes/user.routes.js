const express = require("express");

const UserModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config()
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send({ msg: "All fields are required" });
        }

       
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ msg: "Email is already registered." });
        }
       
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(400).send({ msg: err.message });
            }
            else {
                const user = new UserModel({ username, email, password: hash });
                await user.save();
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });
                res.status(200).send({ token, msg: "User created successfully" });
            }
        })
    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error" });
    }
})

userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).send({msg:"Email and password required"})
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ msg: "Invalid email or password" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).send({ msg: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });
        res.status(200).send({ token, msg: "Login successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
});

module.exports = userRouter