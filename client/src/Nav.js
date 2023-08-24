import React from 'react'
import AddItem from './AddItem'
import Search from './Search'
const Nav = ({item, setItem, handleSubmit, search, setSearch}) => {
  return (
    <nav>
        <AddItem item = {item} setItem = {setItem} handleSubmit = {handleSubmit}/>
        <Search search = {search} setSearch = {setSearch}/>
    </nav>
  )
}

export default Nav