const express = require("express");
const CommentsService = require("../services/comments");

const commentsRouter = express.Router();

commentsRouter.post("/", async (req, res) => {
  const { authorId, content } = req.body;  

  if (!authorId.trim() || !content.trim()) {
    return res.status(404).json("Missing required fields");
  }

  try {
    const comment = await CommentsService.createComment(
      authorId,
      content
    );
    if (!comment) {
      return res.status(404).json("Failed to create comment");
    }
    res.status(201).json("Comment created successfully");
    
  } catch (error) {
    console.error(error);
    res.status(500).json({message: error?.message});
  }
});

commentsRouter.get('/', async (req, res) => {
  try {
    const comments = await CommentsService.getAllComments();

    if(!comments) {
        return res.status(404).json({ message: 'Comments not found' });
    }
    res.status(200).json(comments);
    
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

commentsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  if(!id) {
    return res.status(404).json({ message: 'Comment not found' });
  };

  try {
    const comment = await CommentsService.getCommentById(id);
    
    if(!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    };
    res.status(200).json(comment);

  } catch(error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

commentsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if(!id) {
    return res.status(404).json({ message: 'Comment not found' });
  };

  try {
    const comment = CommentsService.deleteComment(id);
    if(!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json('Comment deleted successfully');

  } catch(error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

commentsRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;  
  if(!id || !req.body) {
    return res.status(404).json({ message: 'Missing required fields' });
  }
  
  try {
    const updatedComment = await CommentsService.updateComment(id, req.body, {
      new: true,            // Return the updated document
      runValidators: true,  // Run schema validators on update
    });

    if(!updatedComment) {
        return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({message: 'Comment updated successfully', updatedComment});
    
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  };  
});

module.exports = commentsRouter;
