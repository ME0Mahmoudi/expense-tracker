import { useEffect, useState } from "react";

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editAmount, setEditAmount] = useState("")

  const loadExpenses = () => {
    fetch("http://localhost:3001/api/expenses")
      .then(res => res.json())
      .then(data => setExpenses(data))
      .catch(err => console.error(err));
  };

  async function deleteExpense(id) {
    await fetch(`http://localhost:3001/api/expenses/${id}`, {
      method: "DELETE",
    });

    loadExpenses();
  }

  async function updateExpense(id) {
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

    loadExpenses()
    setEditingId(null)
  }

  return (
    <>
      <h1>Expense Tracker</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const response = await fetch(
            "http://localhost:3001/api/expenses",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title,
                amount: Number(amount),
              }),
            }
          );

          const newExpense = await response.json();

          setExpenses([...expenses, newExpense]);

          setTitle("");
          setAmount("");
        }}
      >
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button type="submit">
          Add Expense
        </button>
      </form>

      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            {editingId === expense.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <input
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                />

                <button onClick={() => updateExpense(expense.id)}>
                  Save
                </button>

                <button
                  onClick={() => {
                    setEditingId(null)
                    setEditTitle("")
                    setEditAmount("")
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                {expense.title} - ${expense.amount}

                <button onClick={() => deleteExpense(expense.id)}>
                  Delete
                </button>

                <button
                  onClick={() => {
                    setEditingId(expense.id);
                    setEditTitle(expense.title);
                    setEditAmount(expense.amount);
                  }}
                >
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;