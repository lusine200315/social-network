const express = require('express');
const postsRouter = express.Router();

const PostsService = require('../services/posts');

const multer = require('multer');
const upload = multer({dest: 'public/upload'});
postsRouter.use(express.static('public'));

postsRouter.post('/', upload.single('image'), async (req, res) => {
    const { content, authorId } = req.body;
    const { file } = req;
    const image = file ? file.path : null;
    
    if( !content?.trim() || !authorId?.trim()) {
        return res.status(400).json({ message: 'Missing required fields' });
    };

    try {
        const post = await PostsService.createPost(content, authorId, image);
        if(!post) {
            return res.status(500).json({ message: 'Failed to create post' });
        }
        res.status(201).json('Post created successfully');
        
    } catch(error) {
        res.status(500).json({message: error?.message});
    };
});

postsRouter.get('/', async (req, res) => {
    try {
        const posts = await PostsService.getAllPosts();
        if(!posts) {
            return res.status(404).json({ message: 'Posts not found' });
        }
        res.status(200).json(posts);

    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    };
});

postsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({ message: 'Missing required fields' });
    };

    try {
        const post = await PostsService.getPostById(id);
        if(!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);

    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    };
});

postsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({ message: 'Missing required fields' });
    };

    try {
        const post = await PostsService.deletePost(id);
        if(!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json('Post deleted successfully');

    } catch(error) {
        console.error(error);
        res.status(500).json({ mssage: "Internal Server Error" });
    };
});

postsRouter.patch('/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;  
    const { file } = req;
    const image = file ? file.path : null;

    if(!id || !req.body) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        if(image) {
            req.body.image = image;
        };
        const post = await PostsService.updatePost(id, req.body, {
            new: true,            // Return the updated document
            runValidators: true,  // Run schema validators on update
        });
    
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        return res.status(200).json({ message: 'Post updated successfully', post });
        
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    };
});

module.exports = postsRouter;