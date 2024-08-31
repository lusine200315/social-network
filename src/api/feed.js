const express = require('express');
const feedRouter = express.Router();

const UsersService = require('../services/users');
const PostsService = require('../services/posts');
const CachesService = require('../services/cache');

const authMiddleware = require('../middleware/auth');

feedRouter.get('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    if(!id) {
        res.status(400).json({ message: 'Missing id parameter' });
    };
    
    try {
        const user = await UsersService.getUserById(id);
        if(!user) {
            res.status(404).json({ message: 'User not found' });
        };

        const followersIds = user.followers;
        const feedFromCache = await CachesService.getCacheData(id);
        
        if(!feedFromCache) {
            const feedFromDb = await PostsService.getPostByAuthorIds(followersIds);    

            await CachesService.setCacheData(id, JSON.stringify(feedFromDb));
            return res.json({feed: feedFromDb});
        };
        return res.json({feed: JSON.parse(feedFromCache)});

    } catch(error) {
        console.log(error);
    };
});

module.exports = feedRouter;