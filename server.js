const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const listEndpoints = require('express-list-endpoints')
const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const emailQueue = require('./queues/emailQueue'); // Your email queue
require('./jobs/emailWorker'); // Email worker



const port = process.env.PORT || 8000;
// CORS
app.use(cors());
// Express Body Parser
app.use(express.json());


const cron = require('node-cron');
const { scheduleEmails } = require('./jobs/scheduleEmails');
// Cron job to periodically refresh scheduled emails
cron.schedule('* * * * *', () => {
  console.log('Refreshing scheduled emails...');
  scheduleEmails();
});

// START BULLMQ
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');
createBullBoard({
  queues: [new BullMQAdapter(emailQueue)],
  serverAdapter,
});
app.use('/admin/queues', serverAdapter.getRouter());
// END BULLMQ

//=================~import route~=================
const ai = require('./routes/api/ai');
const auth = require('./routes/api/auth');
const email = require('./routes/api/email');
//=================~use route~=================

app.use('/', auth);
app.use('/', email);
app.use('/api/ai', ai);

app.get('/send-email-form', (req, res) => {
  res.sendFile(__dirname + '/send-email-form.html');
});

app.listen(port, () => {
  console.log(`Server is running on port: localhost:${port}`);
  console.log(listEndpoints(app));
});


