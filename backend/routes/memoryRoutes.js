const express = require('express');
const { saveGameData,getResult } = require('../controllers/memoryController');
const router = express.Router();

// Route to save game data
router.post('/save', saveGameData);
router.get('/getResult/:userId', getResult);


module.exports = router;
