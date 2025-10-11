const puppeteer = require("puppeteer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const Prescription = require("../models/prescription.model"); // import the model

exports.generatePrescriptionPDF = async (req, res) => {
  try {
    const { doctor, patient, diagnosis, findings, allergy, advice, medicines, user_id, signature, template } = req.body;
    // console.log('request body',req.body);
    // 1️⃣ Save prescription and medicines to the database
    const prescription = await Prescription.create({
      user_id,
      patient_name: patient.name,
      age: patient.age,
      sex: patient.sex,
      diagnosis,
      findings,
      allergy,
      advice,
      signature: signature || null,
      template: template || null,
      medicines, // array of medicines
    });

    // 2️⃣ Generate PDF using the saved data
    const filePath = path.join(process.cwd(), "templates", "prescriptionTemplate.hbs");
    const html = fs.readFileSync(filePath, "utf8");

    const templateCompiler = handlebars.compile(html);

    // Include prescription and medicines for PDF rendering
    const htmlContent = templateCompiler({
      doctor,
      patient,
      diagnosis,
      findings,
      allergy,
      advice,
      medicines,
      date: new Date().toDateString(),
      prescriptionId: prescription.id,
    });

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--no-zygote",
        "--single-process",
      ],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    // 3️⃣ Send PDF as response
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=prescription_${prescription.id}.pdf`,
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
};
