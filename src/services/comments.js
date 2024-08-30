const CommentsModel = require("../model/comments");

class CommentsService {
  static async createComment(authorId, content) {
    try {
      if (!authorId || !content) {
        return null;
      };

      const comment = new CommentsModel({ authorId, content });
      return comment.save();
    } catch(error) {
      console.error(error);
      throw new Error (error?.message);
    }
  }

  static async getAllComments() {
    try {
      const comments = await CommentsModel.find();
      if (!comments) {
        return null;
      }
      return comments;

    } catch(error) {
      console.error(error);
      throw new Error (error?.message);
    };
  }

  static async getCommentById(id) {    
    try {

      if (!id) {
        return null;
      }
      const comment = await CommentsModel.findOne({ _id: id });
      if (!comment) {
        return null;
      };
      return comment;

    } catch(error) {
      console.error(error);
      throw new Error (error?.message);
    };
  }
  
  static deleteComment(id) {
    try {
      if (!id) {
        return null;
      }
      const comment = CommentsModel.findOneAndRemove({ _id: id });
      if (!comment) {
        return null;
      }
      return comment;

    } catch(error) {
      console.error(error);
      throw new Error (error?.message);
    }
  }

  static async updateComment(id, data) {
    try {
      if(!id || !data) {
        return null;
      };
      const comment = await CommentsModel.findOneAndUpdate({ _id: id}, data, { new: true });
      return comment;
    } catch(error) {
      console.error(error);
      throw new Error (error?.message);
    };
  };
};

module.exports = CommentsService;
