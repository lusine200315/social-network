const express = require('express');
const app = express();

const body_parser = require('body-parser');
app.use(body_parser.json());

require('dotenv').config();
const port = process.env.PORT || 3000;

const usersRouter = require('./src/api/users');
const postsRouter = require('./src/api/posts');
const photosRouter = require('./src/api/photos');
const feedRouter = require('./src/api/feed');
const commentsRouter = require('./src/api/comments');
const authRouter = require('./src/core/auth');

app.use('/users', usersRouter);
app.use('/comments', commentsRouter);
app.use('/posts', postsRouter);
app.use('/feed', feedRouter);
app.use('/auth', authRouter);
app.use('/cdn', photosRouter);

app.listen(port, () => {
    console.log(`Server is running on ${port} port`);
});