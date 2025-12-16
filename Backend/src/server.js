import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());             // Fixes CORS errors mentioned in the challenge [cite: 68]
app.use(express.json());     // Allows the server to read JSON bodies

// --- Endpoint 1: Fetch Profile (GET) ---
// Goal: Gets the current user's details [cite: 22]
app.get('/api/profile', async (req, res) => {
  try {
    // We fetch user with ID 1 (Single user demo)
    const result = await pool.query('SELECT * FROM users WHERE id = 1');
    
    // Returns the JSON object exactly as required [cite: 25-30]
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// --- Endpoint 2: Update Profile (PUT) ---
// Goal: Updates the bio and mood [cite: 33]
app.put('/api/profile', async (req, res) => {
  try {
    const { bio, mood } = req.body; // Data sent from Frontend [cite: 34]

    // Validation: Check constraints from Database Schema [cite: 18]
    if (bio && bio.length > 200) {
      return res.status(400).json({ error: "Bio exceeds 200 characters" });
    }

    // Update the database
    await pool.query(
      'UPDATE users SET bio = $1, mood = $2 WHERE id = 1',
      [bio, mood]
    );

    // Return the specific success message required [cite: 43]
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on https://demoproject-7qwm.vercel.app:${PORT}`);
});