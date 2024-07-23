const { Queue } = require('bullmq');
// const connection = require('../config/redis');
// console.log('connection');
// console.log(connection);
// Create a new queue instance named 'emailQueue'
const emailQueue = new Queue('emailQueue', { connection:{
    host: process.env.REDIS_HOST || 'localhost', // Replace with your Redis host if different
    port: process.env.REDIS_PORT || 6379,        // Replace with your Redis port if different
    username:process.env.REDIS_USERNAME,
    password:process.env.REDIS_PASSWORD
}
});

// const emailQueue = new Queue('emailQueue',connection);

module.exports = emailQueue;
