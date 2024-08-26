const URI = process.env.URI;

const mongoose = require('mongoose');
mongoose.connect(URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;