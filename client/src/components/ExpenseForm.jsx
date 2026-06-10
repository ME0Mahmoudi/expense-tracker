import { useState } from "react";

export default function ExpenseForm({ onExpenseAdded }) {

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
      
        await fetch(
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
      
        setTitle("");
        setAmount("");
      
        onExpenseAdded();
      }

    return (
        <form onSubmit={handleSubmit}>
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
    );
}