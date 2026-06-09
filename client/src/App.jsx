import { useEffect, useState } from "react";

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error(err));
  }, []);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

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
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.title} - ${expense.amount}

            <button
              onClick={async () => {
                await fetch(
                  `http://localhost:3001/api/expenses/${expense.id}`,
                  {
                    method: "DELETE",
                  }
                );

                setExpenses(
                  expenses.filter(
                    (e) => e.id !== expense.id
                  )
                );
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;