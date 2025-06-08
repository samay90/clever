import React from 'react'
import "./index.css"
const SearchInput = ({value,setValue,placeholder}) => {
  return (
    <div className='search_input'>
        <i className="fa-regular fa-magnifying-glass"></i>
        <input type='text' placeholder={placeholder} value={value} onChange={(e)=>setValue(e.target.value)}></input>
        {value?<i onClick={()=>setValue("")} className="fa-regular fa-xmark"></i>:""}
    </div>
  )
}

export default SearchInput