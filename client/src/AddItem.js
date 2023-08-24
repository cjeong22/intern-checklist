import React from 'react'

const AddItem = ({item, setItem, handleSubmit}) => {
  return (
    <form>
      <input 
        autoFocus
        className = 'custom-form'
        id = 'addItem'
        type = 'text'
        placeholder = 'add internship'
        required
        value = {item}
        onChange = {(e) => setItem(e.target.value)}
      />
      <button class = "custom-button" type = 'submit' onClick = {handleSubmit}> submit! </button>
    </form>
  )
}

export default AddItem