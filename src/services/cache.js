const client = require('../core/redis');

class CachesService {
    static async setCacheData(key, value) {
        if (!key || !value) {
            throw new Error('Both key and value must be provided.');
        };
        try {
            const setReply = await client.set(key, value);
            console.log('Set reply:', setReply);
            return setReply;
        } catch (error) {
            console.error('Error setting user:', error);
            throw error;
        };
    }
    static async getCacheData(key) {
        try {
            if(!key) {
                throw new Error('Key is required');
            } else {
                const result = await client.get(key);
                console.log("feed was get form cache");
                return result;
            };
        } catch (error) {
            console.error('Error finding post:', error);
            throw error;
        };
    }
    static async deleteCachePost(key) {
        try {
            if (!key) {
                throw new Error('Key is required');
            } else {
                const delReply = await client.del(key);
                console.log('Del reply:', delReply);
                return delReply;
            };
        } catch (error) {
            console.error('Error deleting post:', error);
            throw error;
        };
    };
};

module.exports = CachesService;