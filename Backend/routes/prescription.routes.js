// const express = require('express');
// const router = express.Router();
// const prescriptionCtrl = require('../controllers/prescription.controller');
// const authMiddleware = require('../middleware/authMiddleware');

// router.post('/generate', authMiddleware, prescriptionCtrl.generate);
// // Add more prescription endpoints as needed

// module.exports = router;



const express = require("express");
const router = express.Router();
const { generatePrescriptionPDF } = require("../controllers/prescription.controller");
router.post("/pdf", generatePrescriptionPDF);

module.exports = router;



