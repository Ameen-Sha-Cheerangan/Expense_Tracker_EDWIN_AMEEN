import './CategoryFilter.css'

// CategoryFilter receives available categories and a controlled selection; selection state lives in its parent.
function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <label className="category-filter">
      <span>Filter by category</span>
      <select
        aria-label="Filter expenses by category"
        onChange={(event) => onCategoryChange(event.target.value)}
        value={selectedCategory}
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </label>
  )
}

export default CategoryFilter
