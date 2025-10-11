const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { name, email, password, hospital, qualification, RegistrationNumber } = req.body;
  console.log(res);
  // const signature = req.file ? req.file.buffer : null; // if uploading signature as image
  if (!email || !password || !name) return res.status(400).json({ message: 'Missing fields' });
  const existing = await User.findByEmail(email);
  if (existing) return res.status(409).json({ message: 'User exists' });
  const password_hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password_hash, hospital, qualification, regino: RegistrationNumber});
  const token = jwt.sign({ id: user.id, name: user.name, hospital: user.hospital, qualification: user.qualification, regino: user.regino }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, name: user.name, hospital: user.hospital, qualification: user.qualification, regino: user.regino }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
};
