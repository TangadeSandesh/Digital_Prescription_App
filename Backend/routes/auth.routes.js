const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const upload = require('../middleware/uploadMiddleware');

// Register (with optional file upload multipart/form-data)
router.post('/register', upload.single('signature'), auth.register);
router.post('/login', auth.login);

module.exports = router;
