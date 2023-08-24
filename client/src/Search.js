import React from 'react'

const Search = ({search, setSearch}) => {
  return (
    <form onSubmit ={(e) => e.preventDefault()}>
      <input
        className = 'custom-form'
        id = 'search'
        type = 'text'
        role = 'searchbox'
        placeholder = 'search internships'
        value = {search}
        onChange = {(e) => setSearch(e.target.value)}
      />
    </form>
  )
}

export default Search