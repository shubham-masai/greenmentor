const mongoose = require("mongoose");
const profileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        trim: true
    },
    profileUrl: {
        type: String,
        trim: true
    },
    mobileNo: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    email: {
        type: String,
        required: true,
        trim: true
    }
}, {
    versionKey: false
});

const ProfileModel = mongoose.model('Profile', profileSchema);

module.exports = ProfileModel