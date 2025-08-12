import { useState } from 'react'
import './SearchBar.css'

const SearchBar = ({ onSearch, loading }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim() && !loading) {
      onSearch(inputValue.trim())
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Enter city name..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="search-input"
          disabled={loading}
        />
        <button 
          type="submit" 
          className="search-button"
          disabled={loading || !inputValue.trim()}
        >
          {loading ? '🔄' : '🔍'}
        </button>
      </div>
    </form>
  )
}

export default SearchBar