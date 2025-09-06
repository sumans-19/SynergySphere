const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/users.json');

// Helper to read users from file
function readUsers() {
  if (!fs.existsSync(dataPath)) return [];
  try {
    const file = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(file);
  } catch (e) {
    return [];
  }
}

// Helper to write users to file
function writeUsers(users) {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2), 'utf8');
}

// Register route
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password required' });
  }
  let users = readUsers();
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: 'Email already used' });
  }
  const user = { name, email, password };
  users.push(user);
  writeUsers(users);
  const { password: _, ...userData } = user;
  res.json({ message: 'Registration successful', user: userData });
});

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  const users = readUsers();
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'No user found with this email' });
  if (user.password !== password) return res.status(401).json({ error: 'Incorrect password' });
  const { password: _, ...userData } = user;
  res.json({ message: 'Login successful', user: userData });
});

module.exports = router;