const express = require('express');
const usersRouter = express.Router();

const UsersService = require('../services/users');

const authMiddleware = require('../middleware/auth');

usersRouter.get('/', async (req, res) => {
    try {
        const users = await UsersService.getAllUsers();
        if(!users) {
            return res.status(404).json({ message: 'Users not found' });
        }
        res.status(200).json(users);

    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    };
});

usersRouter.get('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        if(!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        };

        const user = await UsersService.getUserById(id);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);

    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server error' });
    };
});

usersRouter.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        if(!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        };

        const user = await UsersService.deleteUser(id);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json('User deleted successfully');

    } catch(error) {
        console.error(error);
        res.status(500).json({ mssage: "Internal Server Error" });
    };
});

usersRouter.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;  

        if(!id || !req.body) {
            return res.status(400).json({ message: 'Missing required fields' });
        };

        const user = await UsersService.updateUser(id, req.body, {
            new: true,            
            runValidators: true,
        });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        };
        return res.status(200).json({ message: 'User updated successfully', user });
        
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    };
});

module.exports = usersRouter;