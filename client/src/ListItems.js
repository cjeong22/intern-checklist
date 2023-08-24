import React from 'react'
import LineItem from './LineItem'
const ListItems = ({internships, handleDelete, handleCheck}) => {
  return (
    <ul>
      {internships.map((internship) => (
        <LineItem key = {internship.id} internship = {internship} handleDelete = {handleDelete} handleCheck={handleCheck}/>
      ))}
    </ul>
  )
}

export default ListItems