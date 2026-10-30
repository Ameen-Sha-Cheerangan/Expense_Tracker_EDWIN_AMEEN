import ExpenseItem from './ExpenseItem.jsx'

// ExpenseList receives an expenses array and owns no state; its parent manages expense data.
function ExpenseList({ expenses }) {
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
        <ExpenseItem expense={expense} key={expense.id} />
      ))}
    </ul>
  )
}

export default ExpenseList
