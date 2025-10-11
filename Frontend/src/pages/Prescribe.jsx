// import { useSelector } from "react-redux";
// import { useState } from "react";

// export default function Prescribe() {
//   const { isAuthenticated, user } = useSelector((state) => state.auth);

//   const [signature, setSignature] = useState(null);
//   const [selectedTemplate, setSelectedTemplate] = useState("classic");
//   const [showLoginPopup, setShowLoginPopup] = useState(false);

//   // 🖋️ Signature upload
//   const handleSignatureUpload = (e) => {
//     if (!isAuthenticated) {
//       setShowLoginPopup(true);
//       return;
//     }

//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setSignature(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   // 🎨 Template selection
//   const handleTemplateChange = (e) => {
//     if (!isAuthenticated) {
//       setShowLoginPopup(true);
//       return;
//     }
//     setSelectedTemplate(e.target.value);
//   };

//   // 🧾 Prescription Data
//   const [prescription, setPrescription] = useState({
//     patientName: "",
//     age: "",
//     sex: "",
//     diagnosis: "",
//     findings: "",
//     allergy: "",
//     advice: "",
//   });

//   const [medicines, setMedicines] = useState([
//     { name: "", dosage: "", frequency: "", duration: "", notes: "" },
//   ]);

//   const handleChange = (e) => {
//     setPrescription({ ...prescription, [e.target.name]: e.target.value });
//   };

//   const handleMedicineChange = (index, field, value) => {
//     const updated = [...medicines];
//     updated[index][field] = value;
//     setMedicines(updated);
//   };

//   const addMedicineRow = () => {
//     setMedicines([
//       ...medicines,
//       { name: "", dosage: "", frequency: "", duration: "", notes: "" },
//     ]);
//   };

//   const removeMedicineRow = (index) => {
//     const updated = medicines.filter((_, i) => i !== index);
//     setMedicines(updated);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Prescription:", prescription);
//     console.log("Medicines:", medicines);
//     console.log("Signature:", signature);
//     console.log("Template:", selectedTemplate);
//     alert("Prescription ready to generate as PDF!");
//   };

//   // 🔒 Login redirect
//   const handleLoginRedirect = () => {
//     setShowLoginPopup(false);
//     window.location.href = "/login";
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col md:grid md:grid-cols-4">
//       {/* Left Section — Form */}
//       <div className="col-span-3 p-6 border-r">
//         <h1 className="text-2xl font-bold text-center text-indigo mb-6">
//           Prescription Form
//         </h1>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//           {/* Doctor Info */}
//           {isAuthenticated && user ? (
//             <div>
//               <h2 className="text-lg font-semibold text-indigo mb-2">
//                 Dr. {user.name}
//               </h2>
//               <p className="text-sm text-gray-700">
//                 <span className="font-semibold">Qualification:</span>{" "}
//                 {user.qualification} |{" "}
//                 <span className="font-semibold">Hospital:</span> {user.hospital}
//               </p>
//             </div>
//           ) : (
//             <h2 className="text-lg font-semibold text-indigo mb-2">
//               Prescription (Guest Mode)
//             </h2>
//           )}

//           {/* Patient Info */}
//           <div>
//             <h3 className="text-md font-semibold text-saffron mt-2">
//               Patient Information
//             </h3>
//             <div className="grid md:grid-cols-2 gap-3">
//               <input
//                 type="text"
//                 name="patientName"
//                 placeholder="Patient Name"
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 name="age"
//                 placeholder="Age"
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 name="sex"
//                 placeholder="Sex"
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//               />
//               <textarea
//                 name="diagnosis"
//                 placeholder="Diagnosis / Chief Complaint"
//                 onChange={handleChange}
//                 className="border p-2 rounded md:col-span-2"
//               />
//             </div>
//           </div>

//           {/* Findings / Allergy */}
//           <div>
//             <h3 className="text-md font-semibold text-saffron mt-2">
//               Findings / Allergy
//             </h3>
//             <div className="grid md:grid-cols-2 gap-3">
//               <textarea
//                 name="findings"
//                 placeholder="Findings (observations, test results, etc.)"
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//               />
//               <textarea
//                 name="allergy"
//                 placeholder="Allergies (food, drug, environmental)"
//                 onChange={handleChange}
//                 className="border p-2 rounded"
//               />
//             </div>
//           </div>

//           {/* Medicine Table */}
//           <div>
//             <h3 className="text-md font-semibold text-saffron mt-2">
//               Prescription Details (Rx)
//             </h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-full border text-sm">
//                 <thead className="bg-gray-100 text-indigo">
//                   <tr>
//                     <th className="border p-2">Medicine Name</th>
//                     <th className="border p-2">Dosage</th>
//                     <th className="border p-2">Frequency</th>
//                     <th className="border p-2">Duration</th>
//                     <th className="border p-2">Notes</th>
//                     <th className="border p-2 text-center">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {medicines.map((med, index) => (
//                     <tr key={index}>
//                       <td className="border p-1">
//                         <input
//                           type="text"
//                           value={med.name}
//                           onChange={(e) =>
//                             handleMedicineChange(index, "name", e.target.value)
//                           }
//                           className="w-full border rounded p-1"
//                         />
//                       </td>
//                       <td className="border p-1">
//                         <input
//                           type="text"
//                           value={med.dosage}
//                           onChange={(e) =>
//                             handleMedicineChange(index, "dosage", e.target.value)
//                           }
//                           className="w-full border rounded p-1"
//                         />
//                       </td>
//                       <td className="border p-1">
//                         <input
//                           type="text"
//                           value={med.frequency}
//                           onChange={(e) =>
//                             handleMedicineChange(index, "frequency", e.target.value)
//                           }
//                           className="w-full border rounded p-1"
//                         />
//                       </td>
//                       <td className="border p-1">
//                         <input
//                           type="text"
//                           value={med.duration}
//                           onChange={(e) =>
//                             handleMedicineChange(index, "duration", e.target.value)
//                           }
//                           className="w-full border rounded p-1"
//                         />
//                       </td>
//                       <td className="border p-1">
//                         <input
//                           type="text"
//                           value={med.notes}
//                           onChange={(e) =>
//                             handleMedicineChange(index, "notes", e.target.value)
//                           }
//                           className="w-full border rounded p-1"
//                         />
//                       </td>
//                       <td className="text-center border p-1">
//                         {medicines.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => removeMedicineRow(index)}
//                             className="text-red-500 hover:underline text-xs"
//                           >
//                             Remove
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <button
//               type="button"
//               onClick={addMedicineRow}
//               className="mt-2 text-sm text-indigo hover:underline"
//             >
//               + Add Medicine
//             </button>
//           </div>

//           {/* Advice */}
//           <div>
//             <h3 className="text-md font-semibold text-saffron mt-2">
//               Additional Advice / Instructions
//             </h3>
//             <textarea
//               name="advice"
//               placeholder="Advice for patient..."
//               onChange={handleChange}
//               className="border p-2 rounded w-full min-h-[80px]"
//             />
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="bg-indiagreen text-white py-2 rounded hover:bg-indigo transition"
//           >
//             Generate PDF
//           </button>
//         </form>
//       </div>

//       {/* Right Section — Signature & Template */}
//       <aside className="col-span-1 bg-white border-l p-4 flex flex-col gap-6">
//         <h2 className="bg-indigo text-white text-lg font-semibold text-center">
//           PDF Additions
//         </h2>

//         {/* Signature Upload */}
//         <div className="flex flex-col items-center gap-2">
//           <p className="font-medium text-lg text-indigo text-center">Add Signature</p>
//           {signature ? (
//             <img
//               src={signature}
//               alt="Doctor Signature"
//               className="h-30 object-contain border rounded"
//             />
//           ) : (
//             <div className="h-20 w-40 flex items-center justify-center border rounded text-gray-400">
//               No Signature
//             </div>
//           )}
//           <label className="cursor-pointer bg-indigo text-white text-sm px-3 py-3 rounded hover:bg-saffron transition">
//             Upload / Capture
//             <input
//               type="file"
//               accept="image/*"
//               capture="user"
//               onChange={handleSignatureUpload}
//               className="hidden"
//             />
//           </label>
//         </div>

//         {/* Template Selection */}
//         <div className="flex flex-col gap-2">
//           <p className="font-medium mt-4 text-lg text-indigo text-center">Select Template</p>
//           <select
//             value={selectedTemplate}
//             onChange={handleTemplateChange}
//             className="border p-2 rounded text-sm"
//           >
//             <option value="classic">Classic</option>
//             <option value="modern">Modern</option>
//             <option value="minimal">Minimal</option>
//           </select>
//           <div className="mt-2 border rounded p-2 text-center text-xs text-gray-500">
//             {selectedTemplate === "classic" && "Classic: Clean layout with header/footer"}
//             {selectedTemplate === "modern" && "Modern: Colored header, bold lines"}
//             {selectedTemplate === "minimal" && "Minimal: White space, thin borders"}
//           </div>
//         </div>
//       </aside>

//       {/* 🔔 Login Popup */}
//       {showLoginPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm text-center">
//             <h3 className="text-lg font-semibold text-indigo mb-2">
//               Login Required
//             </h3>
//             <p className="text-sm text-gray-600 mb-4">
//               Please log in to access this feature.
//             </p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={() => setShowLoginPopup(false)}
//                 className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleLoginRedirect}
//                 className="px-4 py-2 bg-indigo text-white rounded hover:bg-saffron transition"
//               >
//                 Login Now
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

















// import React, { useRef, useState } from 'react';
// import { Download } from 'lucide-react';

// export default function InvoiceGenerator() {
//   const invoiceRef = useRef(null);
//   const [isDownloading, setIsDownloading] = useState(false);

//   const downloadPDF = async () => {
//     setIsDownloading(true);
    
//     try {
//       const html2pdf = (await import('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js')).default;
      
//       const element = invoiceRef.current;
      
//       const options = {
//         margin: 0.5,
//         filename: 'invoice.pdf',
//         image: { 
//           type: 'jpeg', 
//           quality: 0.98
//         },
//         html2canvas: { 
//           scale: 2,
//           useCORS: true
//         },
//         jsPDF: { 
//           unit: 'in', 
//           format: 'letter', 
//           orientation: 'portrait' 
//         }
//       };
      
//       await html2pdf().from(element).set(options).save();
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       alert('Failed to generate PDF. Please try again.');
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Download Button */}
//         <div className="mb-6 flex justify-end">
//           <button
//             onClick={downloadPDF}
//             disabled={isDownloading}
//             className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <Download className="w-5 h-5" />
//             {isDownloading ? 'Generating PDF...' : 'Download PDF'}
//           </button>
//         </div>

//         {/* Invoice */}
//         <div 
//           ref={invoiceRef} 
//           className="bg-white shadow-xl"
//           style={{
//             padding: '40px',
//             maxWidth: '850px',
//             margin: '0 auto'
//           }}
//         >
//           {/* Header */}
//           <header className="flex justify-between items-start mb-12 pb-6 border-b-2 border-gray-200">
//             <div>
//               <h1 className="text-5xl font-bold text-gray-800 mb-4">Invoice</h1>
//               <address className="not-italic text-gray-600 space-y-1">
//                 <p>alexandercross202@gmail.com</p>
//                 <p>45189, Research Place, Suite 150A</p>
//                 <p>P: 1-800-961-4952</p>
//                 <p>Business Number: 0-808-234-2380</p>
//               </address>
//             </div>
//             <div className="w-36 h-36 bg-gray-200 flex items-center justify-center text-gray-400">
//               {/* Logo placeholder */}
//               <span className="text-xs">LOGO</span>
//             </div>
//           </header>

//           {/* Article Section */}
//           <article className="mb-8">
//             {/* Client Address and Meta Info */}
//             <div className="flex justify-between mb-8">
//               <address className="not-italic">
//                 <h4 className="text-xl font-bold text-gray-800 mb-2">Jan Denean Banister</h4>
//                 <p className="text-gray-600">name@client.com</p>
//                 <p className="text-gray-600">1613 bethany church road, belton, South</p>
//                 <p className="text-gray-600">Carolina, 29627, USA</p>
//                 <p className="text-gray-600">Phone: 1-864-933-0793</p>
//               </address>

//               <div className="text-right">
//                 <table className="text-left">
//                   <tbody>
//                     <tr>
//                       <th className="pr-4 py-1 text-gray-700 font-semibold">Invoice #</th>
//                       <td className="text-gray-600">101138</td>
//                     </tr>
//                     <tr>
//                       <th className="pr-4 py-1 text-gray-700 font-semibold">Date</th>
//                       <td className="text-gray-600">January 1, 2019</td>
//                     </tr>
//                     <tr>
//                       <th className="pr-4 py-1 text-gray-700 font-semibold">Amount Due</th>
//                       <td className="text-gray-600 font-bold">$600.00</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Inventory Table */}
//             <table className="w-full mb-8 border-collapse">
//               <thead>
//                 <tr className="bg-gray-800 text-white">
//                   <th className="py-3 px-4 text-left">S. No</th>
//                   <th className="py-3 px-4 text-left">Description</th>
//                   <th className="py-3 px-4 text-right">Rate Per Qty</th>
//                   <th className="py-3 px-4 text-right">Qty</th>
//                   <th className="py-3 px-4 text-right">Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-b border-gray-200">
//                   <td className="py-4 px-4">1.</td>
//                   <td className="py-4 px-4">Experience Review</td>
//                   <td className="py-4 px-4 text-right">$150.00</td>
//                   <td className="py-4 px-4 text-right">4</td>
//                   <td className="py-4 px-4 text-right font-semibold">$600.00</td>
//                 </tr>
//               </tbody>
//             </table>

//             {/* Signature Space */}
//             <div className="mb-8 pt-16">
//               <div className="border-t border-gray-400 w-64 ml-auto"></div>
//               <p className="text-right text-gray-600 text-sm mt-2">Authorized Signature</p>
//             </div>

//             {/* Balance Table */}
//             <div className="flex justify-end mb-8">
//               <table className="w-64">
//                 <tbody>
//                   <tr className="bg-gray-800 text-white">
//                     <th className="py-3 px-4 text-left text-lg">Total</th>
//                     <td className="py-3 px-4 text-right text-lg font-bold">$600.00</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </article>

//           {/* Additional Notes */}
//           <aside className="border-t-2 border-gray-200 pt-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-3">Additional Notes</h2>
//             <div className="text-gray-600 leading-relaxed">
//               <p>
//                 We offer limited 10 days refund policy and 30 days workmanship warranty 
//                 on all of our services. For more details, please read our refund policy below.
//               </p>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// }








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

  // 🔹 PDF Generate
  const handleSubmit = async (e) => {
  e.preventDefault();
  
  setIsGenerating(true);
  const payload = {
    doctor: {
      user_id:user.id,
      name: user?.name,
      qualification: user?.qualification,
      hospital: user?.hospital,
      regNo: user?.regino,
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
  // const response = await fetch("http://localhost:5000/api/prescription/pdf", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // });

  if (response.ok) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "Prescription.pdf";
    a.click();
    window.URL.revokeObjectURL(url);
    setIsGenerating(false);
  } else {
    alert("Error generating PDF!");
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
