const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/AuthController');

router.get('/auth', AuthController.auth);
router.get('/oauth2callback', AuthController.oauth2callback);

module.exports = router;