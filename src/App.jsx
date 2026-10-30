import { useState } from 'react'
import CategoryFilter from './components/CategoryFilter.jsx'
import ExpenseForm from './components/ExpenseForm.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import './App.css'

// App owns in-session expense and category state; child components receive data and callbacks as props.
function App() {
  const [expenses, setExpenses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  function addExpense(expense) {
    setExpenses((currentExpenses) => [
      { ...expense, id: crypto.randomUUID() },
      ...currentExpenses,
    ])
  }

  function deleteExpense(expenseId) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== expenseId),
    )
  }

  const categories = [...new Set(expenses.map((expense) => expense.category))].sort()
  const filteredExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses
  const total = filteredExpenses.reduce(
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
          <span className="summary-count-value">{filteredExpenses.length}</span>
          <span>
            {filteredExpenses.length === 1 ? 'expense' : 'expenses'} shown
          </span>
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

          <CategoryFilter
            categories={categories}
            onCategoryChange={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
          {selectedCategory && filteredExpenses.length === 0 ? (
            <p className="empty-state">
              No expenses in this category yet.
            </p>
          ) : (
            <ExpenseList
              expenses={filteredExpenses}
              onDeleteExpense={deleteExpense}
            />
          )}
        </section>
      </div>
      <footer className="app-footer">A clearer view of where it goes.</footer>
    </main>
  )
}

export default App
