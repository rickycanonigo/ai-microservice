const emailQueue = require('../queues/emailQueue');
exports.sendEmail = async (req, res) => {
    const { from, to, subject, body } = req.body;
    try {
        await emailQueue.add('sendEmail', { from_email: from, to_email: to, subject, body });
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

exports.sendEmailForm = async (req, res) => {
    try {
        res.sendFile(__dirname + '../send-email-form.html');
    } catch (error) {
      res.status(500).json({ error: error.message }); // Handle potential errors
    }
}