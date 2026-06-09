import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseItem from "./components/ExpenseItem";

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

      <ExpenseForm
        title={title}
        amount={amount}
        setTitle={setTitle}
        setAmount={setAmount}
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
      />

      <ul>
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            editingId={editingId}
            editTitle={editTitle}
            editAmount={editAmount}
            setEditTitle={setEditTitle}
            setEditAmount={setEditAmount}
            setEditingId={setEditingId}
            updateExpense={updateExpense}
            deleteExpense={deleteExpense}
          />
        ))}
      </ul>
    </>
  );
}

export default App;