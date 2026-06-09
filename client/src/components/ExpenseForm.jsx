export default function ExpenseForm({
    title,
    amount,
    setTitle,
    setAmount,
    onSubmit,
  }) {
    return (
      <form onSubmit={onSubmit}>
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