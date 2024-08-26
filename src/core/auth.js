const express = require('express');

const authRouter = express.Router();

const bcrypt = require('bcrypt');
const UsersService = require('../services/users');
const SALT_ROUNDS = 10;

require('dotenv').config();

const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

authRouter.post('/register', async (req, res) => {
    const { email, username, password } = req.body;

    if( !email?.trim() || !username?.trim() || !password?.trim() ) {
        return res.status(400).json({ message: 'Missing required fields' });
    };

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user =await UsersService.getUserByEmail(email);

    if(!user) {
        const user = await UsersService.createUser(email, username, hashedPassword);
        
        if(!user) {
            return res.status(500).json({ message: 'Failed to create user' });
        }
        const token = jwt.sign({user: user.password}, secretKey, { expiresIn: '1h' });
        
        return res.status(201).json({ message: 'User created successfully', token });
    };

    return res.status(500).json({ message: 'User already exist' });
});

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};

authRouter.post('/login', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    };
    
    try {
        const decoded = await verifyToken(token);

    }  catch (error) {
        log
        res.status(401).json({ message: 'Invalid token', error: error.message });
    };
});

module.exports = authRouter;