const express = require('express');
const postsRouter = express.Router();
const PORT = process.env.PORT;

const PostsService = require('../services/posts');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const PhotosService = require('../services/photos');

postsRouter.post('/', upload.single('image'), async (req, res) => {
    try {
        const { content, authorId } = req.body;
        const photo = req.file.buffer;

        if( !content?.trim() || !authorId?.trim()) {
            return res.status(400).json({ message: 'Missing required fields' });
        };

        let photoData;
        if (photo) {
            photoData = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            };
        };

        const uploadedPhoto = await PhotosService.addPhoto(photoData);

        const uploaded = {
            url: `localhost:${PORT}/cdn/${uploadedPhoto._id}`
        };

        const post = await PostsService.createPost(content, authorId, uploaded);
        
        if (uploadedPhoto && post) {
            return res.status(201).json({ message: "Post data and image added successfully" });
        } else if(uploadedPhoto && !post) {
            return res.status(201).json({ message: "Only image added successfully" });
        } else if(!uploadedPhoto && post) {
            return res.status(201).json({ message: "Only post data added successfully" });
        } else {
            return res.status(500).json({ message: 'Internal Server Error' });
        };

    } catch(error) {
        console.log(error);
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
    try {
        const { id } = req.params;
        if(!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        };

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
    try {
        const { id } = req.params;
        if(!id) {
            return res.status(400).json({ message: 'Missing required fields' });
        };

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

postsRouter.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;  
        const { file } = req;
        const image = file ? file.path : null;

        if(!id || !req.body) {
            return res.status(400).json({ message: 'Missing required fields' });
        };
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