const client = require('../core/redis');

class CachesService {
    static async setCacheData(key, value) {
        if (!key || !value) {
            return null;
        };

        try {
            const setReply = await client.set(key, value);
            return setReply;
        } catch (error) {
            console.error('Error setting user:', error);
            throw new Error;
        };
    }
    static async getCacheData(key) {
        try {
            if(!key) {
                return null;
            } else {
                const result = await client.get(key);
                if(result != true) {
                    return null;
                }
                return result;
            };
        } catch (error) {
            console.error('Error finding post:', error);
            throw new Error;
        };
    }
    static async deleteCachePost(key) {
        try {
            if(!key) {
                throw new Error('Key is required');
            } else {
                const result = await client.del(key);
                return result;
            };
        } catch (error) {
            console.error('Error deleting post:', error);
            throw error;
        };
    };
};

module.exports = CachesService;