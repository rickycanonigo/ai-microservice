const { google } = require('googleapis');
const supabase = require('../config/database');

require('dotenv').config();

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
];

const client_id = process.env.GOOGLE_CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;
const redirect_uris = process.env.GOOGLE_REDIRECT_URI;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris);

function getAuthUrl() {
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
}

async function getAccessToken(code) {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  return tokens;
}

function setCredentials(tokens) {
  oAuth2Client.setCredentials(tokens);
}

async function storeToken(email, tokens) {
  const { error } = await supabase
    .from('email_tokens')
    .upsert({ email, tokens });

  if (error) {
    console.error('Error storing token in Supabase:', error);
  }
}

async function getStoredToken(email) {
  const { data, error } = await supabase
    .from('email_tokens')
    .select('tokens')
    .eq('email', email)
    .single();

  if (error) {
    console.error('Error fetching token from Supabase:', error);
    return null;
  }

  return data ? data.tokens : null;
}

module.exports = { getAuthUrl, getAccessToken, setCredentials, storeToken, getStoredToken, oAuth2Client };
