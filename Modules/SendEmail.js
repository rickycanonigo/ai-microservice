const { google } = require('googleapis');
const { oAuth2Client, getStoredToken } = require('./Auth');

const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

async function sendEmail(email, to, subject, message) {
  const tokens = await getStoredToken(email);
  if (!tokens) {
    throw new Error('No tokens found for this user');
  }
  oAuth2Client.setCredentials(tokens);

  const raw = createRawMessage(to, subject, message);
  try {
    const res = await gmail.users.messages.send({
      userId: 'me',
      resource: {
        raw,
      },
    });
    console.log('Email sent: ', res.data);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
}

function createRawMessage(to, subject, message) {
  const str = [
    `Content-Type: text/plain; charset="UTF-8"\n`,
    `MIME-Version: 1.0\n`,
    `Content-Transfer-Encoding: 7bit\n`,
    `to: ${to}\n`,
    `subject: ${subject}\n\n`,
    `${message}`,
  ].join('');

  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

module.exports = { sendEmail };