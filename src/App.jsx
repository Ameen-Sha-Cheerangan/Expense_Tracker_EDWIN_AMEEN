import { useState } from 'react'
import ExpenseForm from './components/ExpenseForm.jsx'
import './App.css'

// App has no props; it owns the in-session expense state and provides it to the UI.
function App() {
  const [expenses, setExpenses] = useState([])

  function addExpense(expense) {
    setExpenses((currentExpenses) => [
      { ...expense, id: crypto.randomUUID() },
      ...currentExpenses,
    ])
  }

  const total = expenses.reduce(
    (sum, expense) => sum + Math.round(expense.amount * 100),
    0,
  )

  return (
    <main className="app-shell">
      <header className="app-header">
        <a className="brand" href="/" aria-label="Expense tracker home">
          <span className="brand-mark" aria-hidden="true">
            E
          </span>
          <span>pocket</span>
        </a>
        <span className="header-note">Your personal expense tracker</span>
      </header>

      <section className="welcome" aria-labelledby="page-title">
        <p className="eyebrow">YOUR MONEY, IN FOCUS</p>
        <h1 id="page-title">Expense tracker</h1>
        <p className="welcome-copy">
          Keep track of the little things and the big picture.
        </p>
      </section>

      <section className="summary-card" aria-label="Expense summary">
        <div>
          <p className="summary-label">Total expenses</p>
          <p className="summary-total">{(total / 100).toFixed(2)}</p>
        </div>
        <div className="summary-count">
          <span className="summary-count-value">{expenses.length}</span>
          <span>{expenses.length === 1 ? 'expense' : 'expenses'} added</span>
        </div>
      </section>

      <div className="content-grid">
        <section className="panel form-panel" aria-labelledby="add-expense-title">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">NEW ENTRY</p>
              <h2 id="add-expense-title">Add an expense</h2>
            </div>
            <span className="panel-icon" aria-hidden="true">
              +
            </span>
          </div>
          <ExpenseForm onAddExpense={addExpense} />
        </section>

        <section className="panel expenses-panel" aria-labelledby="expenses-title">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">YOUR ACTIVITY</p>
              <h2 id="expenses-title">Recent expenses</h2>
            </div>
          </div>

          {expenses.length === 0 ? (
            <p className="empty-state">
              Your expenses will show up here once you add your first one.
            </p>
          ) : (
            <ul className="expense-list">
              {expenses.map((expense) => (
                <li className="expense-item" key={expense.id}>
                  <span className="expense-category-mark" aria-hidden="true">
                    {expense.category.slice(0, 1).toUpperCase()}
                  </span>
                  <div className="expense-details">
                    <span className="expense-description">
                      {expense.description}
                    </span>
                    <span className="expense-meta">
                      {expense.category} · {expense.date}
                    </span>
                  </div>
                  <span className="expense-amount">
                    {expense.amount.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      <footer className="app-footer">A clearer view of where it goes.</footer>
    </main>
  )
}

export default App
