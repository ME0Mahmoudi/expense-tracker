const express = require('express')
const cors = require('cors')
const db = require('./db')

db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        amount REAL NOT NULL
      )
    `)
})

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' })
})

app.get("/api/expenses", (req, res) => {
    db.all("SELECT * FROM expenses", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
});

app.post("/api/expenses", (req, res) => {
    const { title, amount } = req.body;

    db.run(
        "INSERT INTO expenses (title, amount) VALUES (?, ?)",
        [title, amount],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                id: this.lastID,
                title,
                amount,
            });
        }
    );
});

app.delete("/api/expenses/:id", (req, res) => {
    const id = Number(req.params.id);

    db.run(
        "DELETE FROM expenses WHERE id = ?",
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({ success: true });
        }
    );
});

app.put("/api/expenses/:id", (req, res) => {
    const id = Number(req.params.id);
    const { title } = req.body;

    db.run(
        "UPDATE expenses SET title = ? WHERE id = ?",
        [title, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.json({ success: true });
        }
    );
});

app.listen(3001, () => {
    console.log('Server running on port 3001')
})