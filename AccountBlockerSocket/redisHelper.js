const { json } = require('body-parser');
const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URL); //creates a new client

redisClient.on('connect',()=>{
    console.log('Redis is Working...');
});

redisClient.on('error',()=>{
    console.log('Redis is not Working !!!');
});

module.exports = redisClient;