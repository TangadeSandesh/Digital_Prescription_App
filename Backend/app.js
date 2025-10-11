require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const prescriptionRoutes = require('./routes/prescription.routes');

const app = express();

// ✅ CORS — restrict in production for security
app.use(cors({
  origin: process.env.CLIENT_URL || 'https://digital-prescription-app-4.onrender.com', // Replace * with your frontend URL in prod
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/prescription', prescriptionRoutes);

// ✅ Render dynamically assigns PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


