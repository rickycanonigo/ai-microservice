const { Queue } = require('bullmq');
const connection = require('../config/redis');

// Create a new queue instance named 'emailQueue'
const emailQueue = new Queue('emailQueue', { connection });

module.exports = emailQueue;
