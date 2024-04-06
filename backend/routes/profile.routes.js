const express = require('express');
const profileRouter = express.Router();
const  ProfileModel = require('../model/profile.model');
const auth = require('../middleware/auth.middleware');

profileRouter.get('/', auth, async (req, res) => {
    const userId = req.userId; 
    try {
        const profile = await ProfileModel.findOne({ user: userId });
        if (!profile) {
            return res.status(400).send({ msg: 'Profile not found' });
        }
        return res.status(200).send(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        return res.status(500).send({ msg: 'Internal server error' });
    }
});

// Route to update a user's profile
profileRouter.put('/', auth, async (req, res) => {
    const userId = req.userId;
    const { name, profileUrl, mobileNo, gender } = req.body;

    try {

        if(!profileUrl || !mobileNo || !gender || !name){
            return res.status(400).send({msg:"All fields are require"})
        }
        const updatedProfile = await ProfileModel.findOneAndUpdate(
            { user: userId },
            { profileUrl, mobileNo, gender, name },
            { new: true } 
        );

        if (!updatedProfile) {
            return res.status(400).json({ message: 'Profile not found' });
        }

        return res.status(200).send(updatedProfile);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = profileRouter;