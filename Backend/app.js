// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');

// const authRoutes = require('./routes/auth.routes');
// const prescriptionRoutes = require('./routes/prescription.routes');

// const app = express();

// // ✅ CORS — restrict in production for security
// app.use(cors({
//   origin: process.env.CLIENT_URL || 'https://digital-prescription-app-4.onrender.com', // Replace * with your frontend URL in prod
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/prescription', prescriptionRoutes);

// // ✅ Render dynamically assigns PORT
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const prescriptionRoutes = require('./routes/prescription.routes');

const app = express();

// CORS: allow one or many frontend URLs via env (comma-separated)
const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser clients (no Origin header)
      if (!origin) return callback(null, true);
      if (allowedOrigins.length === 0) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/prescription', prescriptionRoutes);

// ✅ Render dynamically assigns PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
