// models/prescription.model.js
const db = require('./db');

module.exports = {
  // Create a new prescription and its medicines
  create: async ({ user_id, patient_name, age, sex, diagnosis, findings, allergy, advice, signature, template, medicines }) => {
    try {
      const clean = (value) => (typeof value === 'string' ? value.trim() : value);

      // 1️⃣ Insert prescription
      const prescriptionResult = await db.query(
        `INSERT INTO prescriptions 
          (user_id, patient_name, age, sex, diagnosis, findings, allergy, advice, signature, template, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,NOW())
         RETURNING *`,
        [
          user_id,
          clean(patient_name),
          clean(age),
          clean(sex),
          clean(diagnosis),
          clean(findings),
          clean(allergy),
          clean(advice),
          clean(signature),
          clean(template),
        ]
      );

      const prescription = prescriptionResult.rows[0];

      // 2️⃣ Insert medicines linked to this prescription
      const safeMedicines = Array.isArray(medicines)
        ? medicines
            .map((med) => ({
              name: clean(med?.name),
              dosage: clean(med?.dosage),
              frequency: clean(med?.frequency),
              duration: clean(med?.duration),
              notes: clean(med?.notes),
            }))
            .filter((med) => Object.values(med).some((value) => value))
        : [];

      if (safeMedicines.length > 0) {
        const medicineQueries = safeMedicines.map(med =>
          db.query(
            `INSERT INTO medicines 
              (prescription_id, name, dosage, frequency, duration, notes)
             VALUES ($1,$2,$3,$4,$5,$6)`,
            [prescription.id, med.name, med.dosage, med.frequency, med.duration, med.notes]
          )
        );
        await Promise.all(medicineQueries);
      }

      return prescription;
    } catch (err) {
      console.error("Error creating prescription:", err);
      throw err;
    }
  },

  // Fetch a prescription by ID including its medicines
  findById: async (id) => {
    const prescriptionResult = await db.query(`SELECT * FROM prescriptions WHERE id=$1`, [id]);
    const prescription = prescriptionResult.rows[0];
    if (!prescription) return null;

    const medicinesResult = await db.query(`SELECT * FROM medicines WHERE prescription_id=$1`, [id]);
    prescription.medicines = medicinesResult.rows;
    return prescription;
  },

  // Fetch all prescriptions (optionally by user)
  findAllByUser: async (user_id) => {
    const prescriptionsResult = await db.query(`SELECT * FROM prescriptions WHERE user_id=$1 ORDER BY created_at DESC`, [user_id]);
    return prescriptionsResult.rows;
  }
};
