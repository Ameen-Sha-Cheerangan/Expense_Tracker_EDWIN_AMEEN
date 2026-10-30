import { useState } from 'react'
import './ExpenseForm.css'

const initialValues = {
  amount: '',
  description: '',
  category: '',
  date: '',
}

const amountPattern = /^\d+(?:\.\d{1,2})?$/
const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/

function isValidDate(value) {
  const match = datePattern.exec(value)

  if (!match) {
    return false
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const daysInMonth = [
    31,
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ]

  return month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth[month - 1]
}

// ExpenseForm receives an onAddExpense callback and keeps its field values and validation error in local state.
function ExpenseForm({ onAddExpense }) {
  const [values, setValues] = useState(initialValues)
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setValues((currentValues) => ({ ...currentValues, [name]: value }))
    if (error) {
      setError('')
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const amountValue = String(formData.get('amount') ?? '')
    const description = String(formData.get('description') ?? '')
    const category = String(formData.get('category') ?? '')
    const date = String(formData.get('date') ?? '')
    const amount = Number(amountValue)

    if (!amountPattern.test(amountValue) || !Number.isFinite(amount) || amount <= 0) {
      setError('Enter an amount greater than zero with no more than two decimal places.')
      return
    }

    if (!description.trim()) {
      setError('Enter a description for this expense.')
      return
    }

    if (!category) {
      setError('Choose a category for this expense.')
      return
    }

    if (!isValidDate(date)) {
      setError('Choose a valid date for this expense.')
      return
    }

    onAddExpense({
      amount,
      description: description.trim(),
      category,
      date,
    })
    setValues(initialValues)
    setError('')
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit} noValidate>
      <label className="field">
        <span>Amount</span>
        <span className="amount-input">
          <span aria-hidden="true">¤</span>
          <input
            autoComplete="off"
            inputMode="decimal"
            name="amount"
            onChange={handleChange}
            placeholder="0.00"
            required
            type="number"
            value={values.amount}
          />
        </span>
      </label>

      <label className="field">
        <span>Description</span>
        <input
          autoComplete="off"
          name="description"
          onChange={handleChange}
          placeholder="What was it for?"
          required
          type="text"
          value={values.description}
        />
      </label>

      <div className="field-row">
        <label className="field">
          <span>Category</span>
          <select
            name="category"
            onChange={handleChange}
            required
            value={values.category}
          >
            <option disabled value="">
              Select one
            </option>
            <option>Food</option>
            <option>Transport</option>
            <option>Housing</option>
            <option>Entertainment</option>
            <option>Health</option>
            <option>Shopping</option>
            <option>Utilities</option>
            <option>Other</option>
          </select>
        </label>

        <label className="field">
          <span>Date</span>
          <input
            name="date"
            onChange={handleChange}
            required
            type="date"
            value={values.date}
          />
        </label>
      </div>

      {error && (
        <p className="form-error" id="expense-form-error" role="alert">
          {error}
        </p>
      )}

      <button className="submit-expense" type="submit">
        Add expense
        <span aria-hidden="true">→</span>
      </button>
    </form>
  )
}

export default ExpenseForm
