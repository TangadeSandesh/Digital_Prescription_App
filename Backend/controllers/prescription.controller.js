const puppeteer = require("puppeteer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const Prescription = require("../models/prescription.model"); // import the model

exports.generatePrescriptionPDF = async (req, res) => {
  let browser;
  try {
    const { doctor, patient, diagnosis, findings, allergy, advice, medicines, user_id, signature, template } = req.body;
    const resolvedUserId = user_id || doctor?.user_id || null;

    if (!doctor || !patient || !patient.name) {
      return res.status(400).json({ message: "Invalid payload: doctor/patient details are required" });
    }

    const safeMedicines = Array.isArray(medicines) ? medicines : [];

    // 1️⃣ Save prescription and medicines to the database
    const prescription = await Prescription.create({
      user_id: resolvedUserId,
      patient_name: patient.name,
      age: patient.age,
      sex: patient.sex,
      diagnosis,
      findings,
      allergy,
      advice,
      signature: signature || doctor?.signature || null,
      template: template || null,
      medicines: safeMedicines, // array of medicines
    });

    // 2️⃣ Generate PDF using the saved data
    const filePath = path.resolve(__dirname, "..", "templates", "prescriptionTemplate.hbs");
    if (!fs.existsSync(filePath)) {
      throw new Error(`Template not found at ${filePath}`);
    }
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
      medicines: safeMedicines,
      date: new Date().toDateString(),
      prescriptionId: prescription.id,
    });

    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();
    browser = null;

    // 3️⃣ Send PDF as response
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=prescription_${prescription.id}.pdf`,
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error("PDF generation error:", err);
    const errorMessage =
      (err && typeof err === "object" && err.message) ||
      (typeof err === "string" ? err : "") ||
      "Unknown server error";
    res.status(500).json({ message: `Failed to generate PDF: ${errorMessage}` });
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (_) {
        // ignore browser close errors
      }
    }
  }
};
