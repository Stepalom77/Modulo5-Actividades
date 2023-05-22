const mongoose = require('mongoose');
const Schema = mongoose.Schema
const PASSWORD_PATTERN = /^.{8,}$/;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'A valid password is required'],
        match: [PASSWORD_PATTERN, 'the password is invalid']
    },
    bio: {
        type: String
    },
    active: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
})

const User = mongoose.model('User', userSchema);
module.exports = User;