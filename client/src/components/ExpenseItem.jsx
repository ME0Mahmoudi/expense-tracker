export default function ExpenseItem({
    expense,
    editingId,
    editTitle,
    editAmount,
    setEditTitle,
    setEditAmount,
    setEditingId,
    updateExpense,
    deleteExpense,
  }) {
    if (editingId === expense.id) {
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
            onClick={() => updateExpense(expense.id)}
          >
            Save
          </button>
  
          <button
            onClick={() => {
              setEditingId(null);
              setEditTitle("");
              setEditAmount("");
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
            setEditingId(expense.id);
            setEditTitle(expense.title);
            setEditAmount(expense.amount);
          }}
        >
          Edit
        </button>
      </li>
    );
  }