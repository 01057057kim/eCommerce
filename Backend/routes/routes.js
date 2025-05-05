const express = require('express');
const router = express.Router();
const { 
  getWelcome, 
  getHealth, 
  getData, 
  testConnection
} = require('../controllers/controllers');

router.get('/', getWelcome);

router.get('/api/health', getHealth);

router.get('/api/data', getData);

router.get('/api/test-connection', testConnection);

module.exports = router;
