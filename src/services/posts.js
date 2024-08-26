const postsModel = require('../model/posts');

class PostsService {
    static async createPost(content, authorId, image) {
        if( !content.trim() || !authorId.trim()) {
            return null;
        };
        try {
            const user = new postsModel({content, authorId, image});
            return user.save();
            
        } catch(error) {
            console.error(error);
            throw new Error (error?.message);
        }
    };

    static async getAllPosts() {
        const posts = await postsModel.find();

        if(!posts) {
            return [];
        }
        return posts;
    };

    static async getPostById(id) {
        if(!id) {
            return null;
        }
        
        const post = await postsModel.findOne({ _id :id});
        if(!post) {
            return null;
        }
        return post;
    };

    static async deletePost(id) {
        if(!id) {
            return null;
        }
        const post = await postsModel.findOneAndRemove({ _id: id});
        if(!post) {
            return null;
        }
        return post;
    };

    static async updatePost(id, data) {
        if(!id || !data) {
            return null;
        };
        const post = await postsModel.findOneAndUpdate({ _id: id}, data, { new: true });
        return post;
    };
}

module.exports = PostsService;