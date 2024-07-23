const { Worker } = require('bullmq');
const { sendEmail } = require('../Modules/SendEmail');
const connection = require('../config/redis');

const emailWorker = new Worker('emailQueue', async job => {
  const { from_email, to_email, subject, body } = job.data;
  try {
    await sendEmail(from_email, to_email, subject, body);
    console.log(`Email sent successfully to ${to_email}`);
  } catch (error) {
    console.error(`Error sending email to ${to_email}:`, error);
    throw error; // Ensure errors are propagated for visibility
  }
}, {
  connection,
  maxRetriesPerRequest: null, // Explicitly set this to null for the Worker
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

emailWorker.on('completed', job => {
  console.log(`${job.id} has completed!`);
});

emailWorker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});

module.exports = emailWorker;
