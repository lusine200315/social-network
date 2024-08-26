const express = require('express');
const UsersService = require('../services/users');
const feedRouter = express.Router();

feedRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    if(!id) {
        res.status(400).json({ message: 'Missing id parameter' });
    };

    const user = await UsersService.getUserById(id);
    
    if(!user) {
        res.status(404).json({ message: 'User not found' });
    };

    const usersData = await UsersService.getUsersById(user.followers);
    res.send(usersData);
    
});

module.exports = feedRouter;