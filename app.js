const express = require('express');
const app = express();

const body_parser = require('body-parser');
app.use(body_parser.json());

require('dotenv').config();
const port = process.env.PORT || 3000;

const usersRouter = require('./src/api/users');
const commentsRouter = require('./src/api/comments');
const postsRouter = require('./src/api/posts');
const feedRouter = require('./src/api/feed');
const authRouter = require('./src/core/auth');

app.use('/users', usersRouter);
app.use('/comments', commentsRouter);
app.use('/posts', postsRouter);
app.use('/feed', feedRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Server is running on ${port} port`);
});