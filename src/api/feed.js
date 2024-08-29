const express = require('express');
const feedRouter = express.Router();

const UsersService = require('../services/users');

const authMiddleware = require('../middleware/auth');
const PostsService = require('../services/posts');
const CachesService = require('../services/cache');

feedRouter.get('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    if(!id) {
        res.status(400).json({ message: 'Missing id parameter' });
    };

    const user = await UsersService.getUserById(id);
    
    if(!user) {
        res.status(404).json({ message: 'User not found' });
    };

    const followersIds = user.followers;

    const result = CachesService.getCacheData(id);
    if(result) {
        res.json({posts: result});  
    }
    const posts = await PostsService.getPostByAuthorIds(followersIds);
    CachesService.setCacheData(id, posts);
    res.json(posts);
});

module.exports = feedRouter;