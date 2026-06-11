import { useState } from "react";

export default function ExpenseItem({
  expense,
  loadExpenses,
}) {

  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(expense.title)
  const [editAmount, setEditAmount] = useState(expense.amount)

  async function updateExpense(id, editTitle, editAmount) {
    try {
      await fetch(
        `http://localhost:3001/api/expenses/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editTitle,
            amount: Number(editAmount),
          }),
        }
      )
    } catch (err) {
      console.error(err);
    }

    setIsEditing(false);
    loadExpenses();
  }

  async function deleteExpense(id) {
    await fetch(`http://localhost:3001/api/expenses/${id}`, {
      method: "DELETE",
    });

    loadExpenses();
  }

  if (isEditing === true) {
    return (
      <li>
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />

        <input
          type="number"
          value={editAmount}
          onChange={(e) => setEditAmount(e.target.value)}
        />

        <button
          onClick={() => updateExpense(expense.id, editTitle, editAmount)}
        >
          Save
        </button>

        <button
          onClick={() => {
            setIsEditing(false);
            setEditTitle(expense.title);
            setEditAmount(expense.amount);
          }}
        >
          Cancel
        </button>
      </li>
    );
  }

  return (
    <li>
      {expense.title} - ${expense.amount}

      <button
        onClick={() => deleteExpense(expense.id)}
      >
        Delete
      </button>

      <button
        onClick={() => {
          setIsEditing(true);
          setEditTitle(expense.title);
          setEditAmount(expense.amount);
        }}
      >
        Edit
      </button>
    </li>
  );
}