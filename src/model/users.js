const mongoose = require('../core/db');

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        minlength: [5, 'Email must be at least 5 characters long'],
        maxlength: [255, 'Email can be at most 255 characters long'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [50, 'Username can be at most 50 characters long'],
        validate: {
            validator: function(value) {
                return /^[a-zA-Z0-9]+$/.test(value);
            },
            message: 'Username can only contain letters and numbers',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        maxlength: [1024, 'Password can be at most 1024 characters long'],
    },
    followers: {
        type: Array,
        default: [],
    },
    following: {
        type: Array,
        default: [],
    },
    posts: {
        type: Array,
        default: [],
    },
    bio: {
        type: String,
        default: '',
        maxlength: [500, 'Bio can be at most 500 characters long'],
    },
    blockedAccounts: {
        type: Array,
        default: [],
    },
    // avatar: {
    //     contentType: Buffer,
    //     MimeType: String
    // },
});

module.exports = mongoose.model('users', schema);
