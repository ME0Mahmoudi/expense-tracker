import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseItem from "./components/ExpenseItem";

function App() {
  const [expenses, setExpenses] = useState([]);

  const loadExpenses = () => {
    fetch("http://localhost:3001/api/expenses")
      .then(res => res.json())
      .then(data => setExpenses(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <>
      <h1>Expense Tracker</h1>

      <ExpenseForm onExpenseAdded={loadExpenses} />

      <ul>
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            loadExpenses={loadExpenses}
          />
        ))}
      </ul>
    </>
  );
}

export default App;