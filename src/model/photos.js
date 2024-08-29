const mongoose = require('../core/db');

const schema = new mongoose.Schema({
    data: Buffer,
    contentType: String,
});

module.exports = mongoose.model('photos', schema);