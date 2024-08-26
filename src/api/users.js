const express = require('express');
const usersRouter = express.Router();

const UsersService = require('../services/users');
const auth = require('../core/auth');

const multer = require('multer');
const upload = multer({dest: 'public/upload'});
usersRouter.use(express.static('public'));

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10; 

usersRouter.post('/', upload.single('avatar'), async (req, res) => {
    const { email, username, password } = req.body;
    const { file } = req;
    
    if( !email?.trim() || !username?.trim() || !password?.trim() ) {
        return res.status(400).json({ message: 'Missing required fields' });
    };

    const avatar = file ? file.path : null;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    try {
        const user = await UsersService.createUser(email, username, hashedPassword, avatar);
        if(!user) {
            return res.status(500).json({ message: 'Failed to create user' });
        }
        res.status(201).json('User created successfully');
        
    } catch(error) {
        res.status(500).json({message: error?.message});
    };
});

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

usersRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({ message: 'Missing required fields' });
    };

    try {
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

usersRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({ message: 'Missing required fields' });
    };

    try {
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

usersRouter.patch('/:id', upload.single('avatar'), async (req, res) => {
    const { id } = req.params;  
    const { file } = req;
    const avatar = file ? file.path : null;

    if(!id || !req.body) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        if(avatar) {
            req.body.avatar = avatar;
        };
        const user = await UsersService.updateUser(id, req.body, {
            new: true,            
            runValidators: true,
        });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ message: 'User updated successfully', user });
        
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    };
});

module.exports = usersRouter;