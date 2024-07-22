const supabase = require('../config/database');

async function fetchScheduledEmails() {
    // Pulling out only the active schedules and beyond todays send_at date and time
    const { data, error } = await supabase
    .from('scheduled_emails')
    .select('*')
    .eq('active', true)
    .gte('send_at', new Date().toISOString());

    if (error) throw error;
    return data;
}

module.exports = fetchScheduledEmails;
