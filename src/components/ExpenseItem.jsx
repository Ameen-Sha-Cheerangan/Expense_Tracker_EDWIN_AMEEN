// ExpenseItem receives one expense object and has no local state.
function ExpenseItem({ expense }) {
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
    </li>
  )
}

export default ExpenseItem
