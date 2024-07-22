const { google } = require('googleapis');
const { getAuthUrl, getAccessToken, storeToken, oAuth2Client } = require('../Modules/Auth');

exports.auth = async (req, res) => {
  try {
    const url = getAuthUrl();
    res.redirect(url);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.oauth2callback = async (req, res) => {
  const code = req.query.code;
  try {
    const tokens = await getAccessToken(code);
    oAuth2Client.setCredentials(tokens);

    // Fetch the user's profile information
    const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client });
    const profileResponse = await oauth2.userinfo.get();

    // Log the full profile response for debugging
    console.log('Profile Response:', profileResponse.data);

    // Extract the user's email address
    const email = profileResponse.data.email;
    console.log('Extracted Email:', email);

    // Store the tokens using the user's email
    await storeToken(email, tokens);
    res.redirect('/send-email-form');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
