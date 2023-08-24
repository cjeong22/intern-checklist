import React from 'react'
import ListItems from './ListItems'


const Content = ({internships, setItems, handleDelete, handleCheck, isLoading, error}) => {
  return (
    <main>
      {error}
      {isLoading}
      {internships.length ? (
        <ListItems internships = {internships} handleDelete = {handleDelete} handleCheck = {handleCheck}/>
      ) : (
        <p style = {{marginTop: '2rem'}}> </p>
      )}
      
    </main>
  )
}

export default Content