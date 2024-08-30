const mongoose = require("../core/db");
const usersSchema = require("./users");

const schema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: usersSchema,
    required: [true, 'Author ID is required'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [1, 'Content cannot be empty'],
    maxlength: [1000, 'Content can be at most 1000 characters long'],
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('comments', schema);
