const mongoose = require('../core/db');
const usersSchema = require('./users');

const schema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Content is required'],
        trim: true,
        minlength: [1, 'Content cannot be empty'],
        maxlength: [5000, 'Content can be at most 5000 characters long'],
    },
    image: {
        url: {
            type: String,
            default: null
        }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: usersSchema,
        required: [true, 'Author is required'],
    },
    likes: {
        type: Number,
        default: 0,
        min: [0, 'Likes cannot be negative'],
    },
    comments: {
        type: Array,
        default: [],
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('posts', schema);