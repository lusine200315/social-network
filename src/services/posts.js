const PostsModel = require('../model/posts');

class PostsService {
    static async createPost(content, authorId, image) {
        try {
            if( !content?.trim() || !authorId?.trim()) {
                return null;
            };
            const user = new PostsModel({content, authorId, image});
            return user.save();
            
        } catch(error) {
            console.error(error);
            throw new Error (error?.message);
        };
    };

    static async getAllPosts() {
        try {
            const posts = await PostsModel.find();
            
            if(!posts) {
                return [];
            };
            return posts;

        } catch(error) {
            console.error(error);
            throw new Error (error?.message);
        };
    };

    static async getPostById(id) {
        try {
            if(!id) {
                return null;
            };
            
            const post = await PostsModel.findOne({ _id :id}).populate('author', 'username');
            if(!post) {
                return null;
            };
            return post;

        } catch (error) {
            console.error(error);
            throw new Error (error?.message);
        }
    };

    static async getPostByAuthorIds(ids) {
        try {
            if(!ids) {
                return null;
            };
            
            let posts = [];
            for(let i = 0; i < ids.length; i++) {
                
                let post = await PostsModel.findOne({author: ids[i]}).select('-_id').populate('author', 'username'); // exclude _id
                
                if(post) {
                    posts.push(post);
                };
            };
            
            if(!posts) {
                return null;
            };
            return posts;
        }  catch (error) {
            console.error(error);
            throw new Error (error?.message);
        };
    };

    static async deletePost(id) {
        try {
            if(!id) {
                return null;
            };
            const post = await PostsModel.findOneAndRemove({ _id: id});
            if(!post) {
                return null;
            };
            return post;
        } catch (error) {
            console.error(error);
            throw new Error (error?.message);
        }
    };

    static async updatePost(id, data) {
        try {
            if(!id || !data) {
                return null;
            };
            const post = await PostsModel.findOneAndUpdate({ _id: id}, data, { new: true });
            return post;
        } catch(error) {
            console.error(error);
            throw new Error (error?.message);
        }
    };
};

module.exports = PostsService;