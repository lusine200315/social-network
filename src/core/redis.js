const redis = require('redis');
const { REDIS_URI } = process.env;

const client = redis.createClient({
    url: REDIS_URI
});

client.connect()
    .then(() => {
        console.log('Redis connected successfully');
    })
    .catch(err => {
        console.error('Redis connection error:', err);
    });

module.exports = client;
