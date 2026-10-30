// ExpenseItem receives one expense and its deletion callback; it owns no state.
function ExpenseItem({ expense, onDeleteExpense }) {
  return (
    <li className="expense-item">
      <span className="expense-category-mark" aria-hidden="true">
        {expense.category.slice(0, 1).toUpperCase()}
      </span>
      <div className="expense-details">
        <span className="expense-description">{expense.description}</span>
        <span className="expense-meta">
          {expense.category} · {expense.date}
        </span>
      </div>
      <span className="expense-amount">{expense.amount.toFixed(2)}</span>
      <button
        aria-label={`Delete ${expense.description}`}
        className="delete-expense"
        onClick={() => onDeleteExpense(expense.id)}
        type="button"
      >
        <span aria-hidden="true">×</span>
      </button>
    </li>
  )
}

export default ExpenseItem
