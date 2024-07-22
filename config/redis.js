const Redis = require('ioredis');
console.log(process.env.REDIS_HOST);
// const redis = new Redis({
//   host: process.env.REDIS_HOST || 'localhost', // Replace with your Redis host if different
//   port: process.env.REDIS_PORT || 6379,        // Replace with your Redis port if different
// });


const redis = new Redis(process.env.REDIS_HOST);

// Checking connection
redis.ping((err, result) => {
    if (err) {
        console.error('Error connecting to Redis:', err);
    } else {
        console.log('Redis is running:', result === 'PONG');
    }
});

// Closing connection
redis.quit();
