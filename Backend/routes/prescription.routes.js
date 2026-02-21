const express = require("express");
const router = express.Router();
const { generatePrescriptionPDF } = require("../controllers/prescription.controller");
router.post("/pdf", generatePrescriptionPDF);

module.exports = router;



