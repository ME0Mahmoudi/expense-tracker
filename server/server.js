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

let expenses = [
    {
        id: 1,
        title: "Coffee",
        amount: 5,
    },
    {
        id: 2,
        title: "Lunch",
        amount: 12,
    },
];

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' })
})

app.get("/api/expenses", (req, res) => {
    res.json(expenses);
});

app.post("/api/expenses", (req, res) => {
    const newExpense = {
        id: Date.now(),
        title: req.body.title,
        amount: req.body.amount,
    };

    expenses.push(newExpense);

    res.status(201).json(newExpense);
});

app.delete("/api/expenses/:id", (req, res) => {
    const id = Number(req.params.id);

    expenses = expenses.filter(
        (expense) => expense.id !== id
    );

    res.json({ success: true });
});

app.listen(3001, () => {
    console.log('Server running on port 3001')
})