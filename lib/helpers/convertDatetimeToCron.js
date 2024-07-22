const moment = require('moment-timezone');

/**
 * Converts a datetime string to a cron expression.
 * @param {string} datetime - The datetime string in "YYYY-MM-DD HH:mm:ssZ" format.
 * @param {string} timezone - The timezone string, e.g., "Asia/Manila".
 * @returns {string} - The cron expression.
 */
function convertDatetimeToCron(datetime, timezone = 'Asia/Manila') {
    const date = moment.tz(datetime, timezone);
    const minutes = date.minutes();
    const hours = date.hours();
    const dayOfMonth = date.date();
    const month = date.month() + 1; // Months are zero-indexed in moment
    const dayOfWeek = '*'; // For a specific date, dayOfWeek is irrelevant
    const cronExpression = `${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`;
    return cronExpression;
}

module.exports = convertDatetimeToCron;
// Example usage
// const datetime = "2024-07-15 18:20:00+00";
// const cronExpression = convertDatetimeToCron(datetime);
// console.log(cronExpression); // Output: "20 18 15 7 *"
