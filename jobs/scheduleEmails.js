const cron = require('node-cron');
const fetchScheduledEmails = require('../Modules/ScheduledEmails');
const emailQueue = require('../queues/emailQueue');
const convertCronDate = require('../lib/helpers/convertDatetimeToCron');
const redis = require('../config/redis');

let cronJobs = {};

async function scheduleEmails() {
  console.log('Fetching scheduled emails and setting up cron jobs...');

  try {
    const emails = await fetchScheduledEmails();
    console.log(emails);
    const timezone = process.env.TIMEZONE;

    Object.values(cronJobs).forEach((job) => job.stop());
    cronJobs = {};

    emails.forEach((emailData) => {
      const cronExpression = convertCronDate(emailData.send_at, timezone);
      console.log(`Cron expression for email ID ${emailData.id}: ${cronExpression}`);

      const job = cron.schedule(cronExpression, async () => {
        await emailQueue.add('sendEmail', {
          from_email: emailData.from_email,
          to_email: emailData.to_email,
          subject: emailData.subject,
          body: emailData.body
        }, {
          connection: redis,
          maxRetriesPerRequest: null // Explicitly set this to null for the queue
        });
        console.log(`Email scheduled for ${emailData.to_email} added to the queue`);
      }, {
        timezone
      });

      cronJobs[emailData.id] = job;
    });
  } catch (error) {
    console.error('Error fetching or scheduling emails:', error);
  }
}

scheduleEmails();

module.exports = { scheduleEmails };
