import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createPool } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const pool = createPool();

app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'dinocamp-backend' });
});

// Load campers from Postgres users table
app.get('/api/users', async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT id, first_name, last_name, username, email, age
       FROM users
       ORDER BY id ASC`
    );

    // Map DB rows into the shape the frontend expects
    const campers = result.rows.map((u) => ({
      id: u.id,
      name: `${u.first_name} ${u.last_name}`,
      // Use username from DB if it exists, otherwise derive it
      username: u.username || `${u.first_name}${u.last_name}`.replace(/\s+/g, ''),
      emoji: '🦕',
    }));

    res.json(campers);
  } catch (err) {
    next(err);
  }
});

// Update username for a user
app.patch('/api/users/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { username } = req.body ?? {};

    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }

    if (typeof username !== 'string' || username.trim().length === 0) {
      return res.status(400).json({ error: 'username is required' });
    }

    const result = await pool.query(
      `UPDATE users
       SET username = $1
       WHERE id = $2
       RETURNING id, first_name, last_name, username`,
      [username.trim(), id]
    );

    const row = result.rows[0];
    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: row.id,
      name: `${row.first_name} ${row.last_name}`,
      username: row.username || `${row.first_name}${row.last_name}`.replace(/\s+/g, ''),
      emoji: '🦕',
    });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`DinoCamp backend listening on port ${PORT}`);
});

