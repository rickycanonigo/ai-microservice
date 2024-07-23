const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USER, // Include the username if your Redis server requires it
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null, // Explicitly set this to null
  retryStrategy: (times) => {
    // reconnect after
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = redis;

