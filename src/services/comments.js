const commentsModel = require("../model/comments");

class CommentsService {
  static async createComment(authorId, content) {
    
    if (!authorId || !content) {
      return null;
    }

    try {
      const comment = new commentsModel({ authorId, content });
      return comment.save();
    } catch(error) {
      console.error(error);
      throw new Error (error?.message);
    }
  }

  static async getAllComments() {
    const comments = await commentsModel.find();
    if (!comments) {
      return [];
    }
    return comments;
  }

  static async getCommentById(id) {    
    if (!id) {
      return null;
    }
    const comment = await commentsModel.findOne({ _id: id });
    if (!comment) {
      return null;
    }
    return comment;
  }
  
  static deleteComment(id) {
    if (!id) {
      return null;
    }
    const comment = commentsModel.findOneAndRemove({ _id: id });
    if (!comment) {
      return null;
    }
    return comment;
  }

  static async updateComment(id, data) {
    if(!id || !data) {
      return null;
    };
    const comment = await commentsModel.findOneAndUpdate({ _id: id}, data, { new: true });
    return comment;
  }
}

module.exports = CommentsService;
