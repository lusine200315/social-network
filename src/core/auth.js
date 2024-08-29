const express = require('express');
const authRouter = express.Router();

require('dotenv').config();

const UsersService = require('../services/users');

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

authRouter.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if( !email?.trim() || !username?.trim() || !password?.trim() ) {
            return res.status(400).json({ message: 'Missing required fields' });
        };

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user =await UsersService.getUserByEmail(email);
        if(user) {
            return res.status(409).json({ message: 'User already exist' });
        };

        const createdUser = await UsersService.createUser(email, username, hashedPassword);
        if(!createdUser) {
            return res.status(500).json({ message: 'Internal Server Error' });
        };
        
        return res.status(201).json({ message: 'User created successfully' });
       
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    };
});

authRouter.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email?.trim() || !password?.trim()) {
            return res.status(400).json({ message: 'Missing required fields' });
        };
    
        const user = await UsersService.getUserByEmail(email);
        if(!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        };
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        };
    
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '12h' });
        return res.status(200).json({ token });

    } catch(error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
    };
    
});

module.exports = authRouter;