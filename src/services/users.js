const usersModel = require('../model/users');

class UsersService {
    static createUser(email, username, password, avatar) {
        
        if( !email?.trim() || !username?.trim() || !password?.trim() ) {
            return null;
        };
        try {
            const user = new usersModel({email, username, password, avatar});
            return user.save();
            
        } catch(error) {
            console.error(error);
            throw new Error (error?.message);
        }
    };

    static async getAllUsers() {
        const users = await usersModel.find();

        if(!users) {
            return [];
        };
        return users;
    };

    static async getUserById(id) {
        if(!id) {
            return null;
        };
        
        const user = await usersModel.findOne({ _id: id});
        if(!user) {
            return null;
        };
        return user;
    };

    static async getUsersById(ids) {
        if(!ids) {
            return [];
        };
        let users = [];
        for(let i = 0; i < ids.length; i++) {
            users[i] = await usersModel.findOne({_id: ids[i]});
        };
        return users;
    };

    static async getUserByEmail(email) {
        if(!email) {
            return null;
        };
        const user = await usersModel.findOne({email});
        if(!user) {
            return null;
        };
        return user;
    }

    static async deleteUser(id) {
        if(!id) {
            return null;
        }
        const user = await usersModel.findOneAndRemove({ _id: id});
        if(!user) {
            return null;
        }
        return user;
    };

    static async updateUser(id, updateData, options) {
        if(!id || !updateData) {
            return null;
        };
        
        const update = {};

        Object.keys(updateData).forEach(field => {
            if (Array.isArray(updateData[field])) {
                update.$push = update.$push || {};
                update.$push[field] = { $each: updateData[field] };
                delete updateData[field]; 
            }
        });
    
        Object.assign(update, updateData);
        return usersModel.findByIdAndUpdate({_id: id}, update, options);

    };
}

module.exports = UsersService;