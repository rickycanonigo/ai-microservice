const express = require('express');
const router = express.Router();
const EmailGenerator = require('../../controllers/emailGeneratorController');

router.post('/generate-email', EmailGenerator.generate);

module.exports = router;