const UsersModel = require('../model/users');

class UsersService {
    static createUser(email, username, password) {
        try {
        
            if( !email?.trim() || !username?.trim() || !password?.trim() ) {
                return null;
            };
            const user = new UsersModel({email, username, password});
            return user.save();
            
        } catch(error) {
            console.error(error);
            throw new Error (error?.message);
        }
    };

    static async getAllUsers() {
        try {
            const users = await UsersModel.find();

            if(!users) {
                return [];
            };
            return users;
        } catch(error) {
            console.error(error);
            throw new Error (error?.message);
        };
    };

    static async getUserById(id) {
        try {
            if(!id) {
                return null;
            };
            
            const user = await UsersModel.findOne({ _id: id});
            if(!user) {
                return null;
            };
            return user;
        } catch(error) {
            console.error(error);
            throw new Error (error?.message);
        };
    };

    static async getUserByEmail(email) {
        try {
            if(!email) {
                return null;
            };
            const user = await UsersModel.findOne({email});
            if(!user) {
                return null;
            };
            return user;
        } catch(error) {
            console.error(error);
            throw new Error (error?.message);
        };
    }

    static async deleteUser(id) {
        try {
            if(!id) {
                return null;
            };
            const user = await UsersModel.findOneAndRemove({ _id: id});
            if(!user) {
                return null;
            };
            return user;
        } catch(error) {
            console.error(error);
            throw new Error (error?.message);
        };
    };

    static async updateUser(id, updateData, options) {
        try {
            if(!id || !updateData) {
                return null;
            };
            
            const update = {};

            Object.keys(updateData).forEach(field => {
                if (Array.isArray(updateData[field])) {
                    update.$push = update.$push || {};
                    update.$push[field] = { $each: updateData[field] };
                    delete updateData[field]; 
                };
            });
        
            Object.assign(update, updateData);
            return UsersModel.findByIdAndUpdate({_id: id}, update, options);
        } catch(error) {
            console.error(error);
            throw new Error (error?.message);
        }
    };
};

module.exports = UsersService;