import ExpenseItem from './ExpenseItem.jsx'

// ExpenseList receives expenses and a deletion callback; it owns no state.
function ExpenseList({ expenses, onDeleteExpense }) {
  if (expenses.length === 0) {
    return (
      <p className="empty-state">
        Your expenses will show up here once you add your first one.
      </p>
    )
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem
          expense={expense}
          key={expense.id}
          onDeleteExpense={onDeleteExpense}
        />
      ))}
    </ul>
  )
}

export default ExpenseList
