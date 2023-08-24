import React from 'react'

const LineItem = ({internship, handleDelete, handleCheck}) => {
  return (
    <li className = 'internship'>
      <input type = "checkbox" onChange = {() => handleCheck(internship._id)} checked = {internship.checked}></input>
      <label> {internship.title + " " + internship.date.toString().substring(5, 10)} </label>
      <button className = 'custom-button' onClick = {() => handleDelete(internship._id)}> Click to delete! </button>
    </li>
  )
}

export default LineItem