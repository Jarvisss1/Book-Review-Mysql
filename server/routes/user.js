
const express = require('express');
const addUser = require('../controllers/user.js');

const router = express.Router();

router.get('/test', addUser);

module.exports = router; 