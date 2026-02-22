 import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import { fetchPdf } from '../features/auth/authAPI';

export default function Prescribe() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(user)
  const [signature, setSignature] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const pdfRef = useRef(null);

  // 🖋️ Signature upload
  const handleSignatureUpload = (e) => {
    if (!isAuthenticated) {
      setShowLoginPopup(true);
      return;
    }
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSignature(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // 🎨 Template selection
  const handleTemplateChange = (e) => {
    if (!isAuthenticated) {
      setShowLoginPopup(true);
      return;
    }
    setSelectedTemplate(e.target.value);
  };

  // 🧾 Prescription Data
  const [prescription, setPrescription] = useState({
    patientName: "",
    age: "",
    sex: "",
    diagnosis: "",
    findings: "",
    allergy: "",
    advice: "",
  });

  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", frequency: "", duration: "", notes: "" },
  ]);

  const handleChange = (e) => {
    setPrescription({ ...prescription, [e.target.name]: e.target.value });
  };

  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const addMedicineRow = () => {
    setMedicines([
      ...medicines,
      { name: "", dosage: "", frequency: "", duration: "", notes: "" },
    ]);
  };

  const removeMedicineRow = (index) => {
    const updated = medicines.filter((_, i) => i !== index);
    setMedicines(updated);
  };

  // 🧾 PDF Generate
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const payload = {
        doctor: {
          user_id: user?.id,
          name: user?.name,
          qualification: user?.qualification,
          hospital: user?.hospital,
          regNo: user?.regino,   // Registration Number
          state: "Maharashtra",
          signature: signature, // base64 image if available
        },
        patient: {
          name: prescription.patientName,
          age: prescription.age,
          sex: prescription.sex,
        },
        diagnosis: prescription.diagnosis,
        findings: prescription.findings,
        allergy: prescription.allergy,
        advice: prescription.advice,
        medicines,
      };

      const response = await fetchPdf(payload);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = `${prescription.patientName}_Prescription.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(err.message || "Error generating PDF!");
    } finally {
      setIsGenerating(false);
    }
  };

  // 🔒 Login redirect
  const handleLoginRedirect = () => {
    setShowLoginPopup(false);
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:grid md:grid-cols-4">
      {/* Left Section — Form */}
      <div className="col-span-3 p-6 border-r">
        <h1 className="text-2xl font-bold text-center text-indigo mb-6">
          Prescription Form
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Doctor Info */}
          {isAuthenticated && user ? (
            <div>
              <h2 className="text-lg font-semibold text-indigo mb-2">
                Dr. {user.name}
              </h2>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Qualification:</span>{" "}
                {user.qualification} |{" "}
                <span className="font-semibold">Hospital:</span> {user.hospital}
              </p>
            </div>
          ) : (
            <h2 className="text-lg font-semibold text-indigo mb-2">
              Prescription (Guest Mode)
            </h2>
          )}

          {/* Patient Info */}
          <div>
            <h3 className="text-md font-semibold text-saffron mt-2">
              Patient Information
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              <input
                type="text"
                name="patientName"
                placeholder="Patient Name"
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="age"
                placeholder="Age"
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="sex"
                placeholder="Sex"
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <textarea
                name="diagnosis"
                placeholder="Diagnosis / Chief Complaint"
                onChange={handleChange}
                className="border p-2 rounded md:col-span-2"
              />
            </div>
          </div>

          {/* Findings / Allergy */}
          <div>
            <h3 className="text-md font-semibold text-saffron mt-2">
              Findings / Allergy
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              <textarea
                name="findings"
                placeholder="Findings (observations, test results, etc.)"
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <textarea
                name="allergy"
                placeholder="Allergies (food, drug, environmental)"
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </div>
          </div>

          {/* Medicine Table */}
          <div>
            <h3 className="text-md font-semibold text-saffron mt-2">
              Prescription Details (Rx)
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead className="bg-gray-100 text-indigo">
                  <tr>
                    <th className="border p-2">Medicine Name</th>
                    <th className="border p-2">Dosage</th>
                    <th className="border p-2">Frequency</th>
                    <th className="border p-2">Duration</th>
                    <th className="border p-2">Notes</th>
                    <th className="border p-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((med, index) => (
                    <tr key={index}>
                      {["name", "dosage", "frequency", "duration", "notes"].map(
                        (field) => (
                          <td key={field} className="border p-1">
                            <input
                              type="text"
                              value={med[field]}
                              onChange={(e) =>
                                handleMedicineChange(
                                  index,
                                  field,
                                  e.target.value
                                )
                              }
                              className="w-full border rounded p-1"
                            />
                          </td>
                        )
                      )}
                      <td className="text-center border p-1">
                        {medicines.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMedicineRow(index)}
                            className="text-red-500 hover:underline text-xs"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={addMedicineRow}
              className="mt-2 text-sm text-indigo hover:underline"
            >
              + Add Medicine
            </button>
          </div>

          {/* Advice */}
          <div>
            <h3 className="text-md font-semibold text-saffron mt-2">
              Additional Advice / Instructions
            </h3>
            <textarea
              name="advice"
              placeholder="Advice for patient..."
              onChange={handleChange}
              className="border p-2 rounded w-full min-h-[80px]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isGenerating}
            className="bg-indiagreen text-white py-2 rounded hover:bg-indigo transition"
          >
            {isGenerating ? "Generating PDF..." : "Generate PDF"}
          </button>

        </form>
      </div>

      {/* Right Section — Signature & Template */}
      <aside className="col-span-1 bg-white border-l p-4 flex flex-col gap-6">
        <h2 className="bg-indigo text-white text-lg font-semibold text-center">
          PDF Additions
        </h2>

        {/* Signature Upload */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-medium text-lg text-indigo text-center">
            Add Signature
          </p>

          {signature ? (
            <img
              src={signature}
              alt="Doctor Signature"
              className="h-24 object-contain border rounded"
            />
          ) : (
            <div className="h-20 w-40 flex items-center justify-center border rounded text-gray-400">
              No Signature
            </div>
          )}

          {/* Upload Button */}
          <label
            htmlFor="signature-upload"
            className={`cursor-pointer text-white text-sm px-3 py-2 rounded transition ${
              isAuthenticated
                ? "bg-indigo hover:bg-saffron"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={() => {
              if (!isAuthenticated) {
                setShowLoginPopup(true);
              }
            }}
          >
            Upload / Capture
          </label>

          <input
            id="signature-upload"
            type="file"
            accept="image/*"
            capture="user"
            className="hidden"
            disabled={!isAuthenticated}
            onChange={(e) => {
              if (!isAuthenticated) {
                e.preventDefault();
                setShowLoginPopup(true);
                return;
              }
              handleSignatureUpload(e);
            }}
          />
        </div>

        {/* Template Selection */}
        <div className="flex flex-col gap-2">
          <p className="font-medium mt-4 text-lg text-indigo text-center">
            Select Template
          </p>
          <select
            value={selectedTemplate}
            onChange={handleTemplateChange}
            className="border p-2 rounded text-sm"
          >
            <option value="classic">Classic</option>
            <option value="modern">Modern</option>
            <option value="minimal">Minimal</option>
          </select>
        </div>
      </aside>

      {/* Hidden PDF Template */}
      <div ref={pdfRef} className="hidden print-area p-10">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-800">Prescription</h1>
          {isAuthenticated && user && (
            <p className="text-gray-700">
              Dr. {user.name} ({user.qualification}) — {user.hospital}
            </p>
          )}
        </div>

        <div className="text-sm mb-4">
          <strong>Patient:</strong> {prescription.patientName} |{" "}
          <strong>Age:</strong> {prescription.age} | <strong>Sex:</strong>{" "}
          {prescription.sex}
        </div>

        <div className="mb-4">
          <strong>Diagnosis:</strong>
          <p>{prescription.diagnosis}</p>
        </div>

        <div className="mb-4">
          <strong>Findings:</strong>
          <p>{prescription.findings}</p>
          <strong>Allergy:</strong>
          <p>{prescription.allergy}</p>
        </div>

        <table className="w-full border-collapse border text-sm mb-6">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Medicine</th>
              <th className="border p-2">Dosage</th>
              <th className="border p-2">Frequency</th>
              <th className="border p-2">Duration</th>
              <th className="border p-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((m, i) => (
              <tr key={i}>
                <td className="border p-2">{m.name}</td>
                <td className="border p-2">{m.dosage}</td>
                <td className="border p-2">{m.frequency}</td>
                <td className="border p-2">{m.duration}</td>
                <td className="border p-2">{m.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mb-4">
          <strong>Advice:</strong>
          <p>{prescription.advice}</p>
        </div>

        {signature && (
          <div className="mt-10 text-right">
            <img
              src={signature}
              alt="Doctor Signature"
              className="h-20 inline-block"
            />
            <p className="text-gray-700 text-sm mt-1">Doctor's Signature</p>
          </div>
        )}
      </div>
    </div>
  );
}
